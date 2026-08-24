import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  onSnapshot, 
  serverTimestamp,
  writeBatch 
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { 
  SliderItem, 
  MenuItem, 
  PageItem, 
  NewsItem, 
  EventItem, 
  GalleryItem, 
  FacilityItem, 
  ProgrammeItem, 
  AicteItem, 
  AdmissionApplication, 
  ContactEnquiry, 
  TickerItem, 
  WhyUsItem, 
  HomeSection,
  FooterConfig, 
  WebsiteSettings 
} from '../types';
import { 
  initialSliders, 
  initialMenus, 
  initialPages, 
  initialProgrammes, 
  initialNews, 
  initialEvents, 
  initialFacilities, 
  initialGallery, 
  initialWhyUs, 
  initialAicte, 
  initialTicker, 
  initialHomeSections,
  initialFooter, 
  initialSettings 
} from './initialData';

// Safe localStorage key prefix for fallback / fast render caching
const CACHE_PREFIX = 'cpg_cache_';

function getCached<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(`Cache read failed for ${key}`, e);
  }
  return fallback;
}

function setCached<T>(key: string, data: T) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Cache write failed for ${key}`, e);
  }
}

// Upload file to Firebase Storage with friendly progress & error resilience
export async function uploadFileToStorage(
  file: File, 
  folder: string = 'uploads',
  onProgress?: (percent: number) => void
): Promise<string> {
  try {
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, `${folder}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => {
          console.warn('Storage upload error, falling back to local object URL/Data URL for preview:', error);
          // Fallback to Data URL if storage bucket is not configured or offline
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result as string);
          };
          reader.onerror = () => reject(error);
          reader.readAsDataURL(file);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch (e) {
            // Fallback
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          }
        }
      );
    });
  } catch (err) {
    console.warn('File upload fallback triggered:', err);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}

// AUTO-SEED FIRESTORE WITH DEMO DATA IF EMPTY
let isSeeding = false;
export async function initializeFirestoreDatabase(forceSeed = false) {
  if (isSeeding) return;
  isSeeding = true;

  try {
    const slidersRef = collection(db, 'sliders');
    const snap = await getDocs(slidersRef);

    if (snap.empty || forceSeed) {
      console.log('Seeding initial Cauvery Polytechnic data into Firestore...');
      const batch = writeBatch(db);

      // Seed Sliders
      for (const item of initialSliders) {
        batch.set(doc(db, 'sliders', item.id), item);
      }
      // Seed Menus
      for (const item of initialMenus) {
        batch.set(doc(db, 'menus', item.id), item);
      }
      // Seed Pages
      for (const item of initialPages) {
        batch.set(doc(db, 'pages', item.id), item);
      }
      // Seed Programmes
      for (const item of initialProgrammes) {
        batch.set(doc(db, 'programmes', item.id), item);
      }
      // Seed News
      for (const item of initialNews) {
        batch.set(doc(db, 'news', item.id), item);
      }
      // Seed Events
      for (const item of initialEvents) {
        batch.set(doc(db, 'events', item.id), item);
      }
      // Seed Facilities
      for (const item of initialFacilities) {
        batch.set(doc(db, 'facilities', item.id), item);
      }
      // Seed Gallery
      for (const item of initialGallery) {
        batch.set(doc(db, 'gallery', item.id), item);
      }
      // Seed Why Us
      for (const item of initialWhyUs) {
        batch.set(doc(db, 'whyUs', item.id), item);
      }
      // Seed AICTE
      for (const item of initialAicte) {
        batch.set(doc(db, 'aicte', item.id), item);
      }
      // Seed Ticker
      for (const item of initialTicker) {
        batch.set(doc(db, 'ticker', item.id), item);
      }
      // Seed Home Sections
      for (const item of initialHomeSections) {
        batch.set(doc(db, 'homeSections', item.id), item);
      }
      // Seed Footer & Settings
      batch.set(doc(db, 'settings', 'footer'), initialFooter);
      batch.set(doc(db, 'settings', 'general'), initialSettings);

      await batch.commit();
      console.log('Database seeding complete!');
    }
  } catch (err) {
    console.warn('Auto-seed checked/error:', err);
  } finally {
    isSeeding = false;
  }
}

// GENERIC FIRESTORE SUBSCRIBER WITH FALLBACK
export function subscribeCollection<T extends { id: string }>(
  collectionName: string,
  cacheKey: string,
  initialFallback: T[],
  onUpdate: (data: T[]) => void,
  sortField: string = 'displayOrder'
) {
  // Immediately dispatch cached/fallback data so UI doesn't flicker
  const initial = getCached<T[]>(cacheKey, initialFallback);
  onUpdate(initial);

  try {
    const colRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((d) => ({
            id: d.id,
            ...(d.data() as any)
          })) as T[];

          // Sort if specified
          if (sortField) {
            items.sort((a: any, b: any) => {
              if (a[sortField] !== undefined && b[sortField] !== undefined) {
                return a[sortField] > b[sortField] ? 1 : -1;
              }
              return 0;
            });
          }
          setCached(cacheKey, items);
          onUpdate(items);
        } else {
          // If empty in Firestore, write initial fallback
          onUpdate(initial);
        }
      },
      (error) => {
        console.warn(`Snapshot subscription failed for ${collectionName}:`, error);
        onUpdate(initial);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn(`Error setting up listener for ${collectionName}:`, err);
    onUpdate(initial);
    return () => {};
  }
}

// SUBSCRIBERS FOR SINGLE DOC (Settings, Footer)
export function subscribeDoc<T>(
  collectionName: string,
  docId: string,
  cacheKey: string,
  initialFallback: T,
  onUpdate: (data: T) => void
) {
  const initial = getCached<T>(cacheKey, initialFallback);
  onUpdate(initial);

  try {
    const docRef = doc(db, collectionName, docId);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as T;
          setCached(cacheKey, data);
          onUpdate(data);
        } else {
          onUpdate(initial);
        }
      },
      (error) => {
        console.warn(`Doc subscription failed for ${collectionName}/${docId}:`, error);
        onUpdate(initial);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn(`Error setting up listener for ${collectionName}/${docId}:`, err);
    onUpdate(initial);
    return () => {};
  }
}

// GENERIC CRUD METHODS
export async function saveDocument<T extends { id?: string }>(
  collectionName: string,
  item: T,
  id?: string
): Promise<string> {
  const targetId = id || item.id || `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const payload = {
    ...item,
    id: targetId,
    updatedAt: new Date().toISOString()
  };

  // 1. Immediately sync into Local Storage Cache for instant persistence & offline readiness
  try {
    const cached = getCached<any[]>(collectionName, []);
    const existingIndex = cached.findIndex((x) => x.id === targetId);
    let updatedList;
    if (existingIndex >= 0) {
      updatedList = [...cached];
      updatedList[existingIndex] = { ...updatedList[existingIndex], ...payload };
    } else {
      updatedList = [payload, ...cached];
    }
    setCached(collectionName, updatedList);
  } catch (e) {
    console.warn(`Local cache sync warning for ${collectionName}:`, e);
  }

  // 2. Persist to Firestore DB
  try {
    const docRef = doc(db, collectionName, targetId);
    await setDoc(docRef, payload, { merge: true });
  } catch (err) {
    console.warn(`Firestore save warning for ${collectionName}/${targetId}:`, err);
  }

  return targetId;
}

export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  // 1. Immediately remove from Local Storage Cache
  try {
    const cached = getCached<any[]>(collectionName, []);
    const updatedList = cached.filter((x) => x.id !== id);
    setCached(collectionName, updatedList);
  } catch (e) {
    console.warn(`Local cache delete warning for ${collectionName}:`, e);
  }

  // 2. Delete from Firestore DB
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn(`Firestore delete warning for ${collectionName}/${id}:`, err);
  }
}

export async function updateDocumentOrder<T extends { id: string; displayOrder?: number; order?: number }>(
  collectionName: string,
  items: T[],
  orderField: 'displayOrder' | 'order' = 'displayOrder'
): Promise<void> {
  const updatedItems = items.map((item, index) => ({
    ...item,
    [orderField]: index + 1
  }));
  setCached(collectionName, updatedItems);

  try {
    const batch = writeBatch(db);
    updatedItems.forEach((item) => {
      const docRef = doc(db, collectionName, item.id);
      batch.set(docRef, { [orderField]: (item as any)[orderField] }, { merge: true });
    });
    await batch.commit();
  } catch (err) {
    console.warn(`Firestore batch order warning for ${collectionName}:`, err);
  }
}

// ADMISSIONS SPECIFIC CRUD
export async function submitAdmissionApplication(
  data: Omit<AdmissionApplication, 'id' | 'applicationId' | 'status' | 'createdAt'>
): Promise<string> {
  try {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const applicationId = `CPG-${year}-${randomNum}`;
    const newDocRef = doc(collection(db, 'admissions'));
    
    const applicationData: AdmissionApplication = {
      ...data,
      id: newDocRef.id,
      applicationId,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    await setDoc(newDocRef, applicationData);
    return applicationId;
  } catch (err) {
    console.error('Error submitting admission application:', err);
    throw err;
  }
}

// CONTACT ENQUIRY SPECIFIC CRUD
export async function submitContactEnquiry(
  data: Omit<ContactEnquiry, 'id' | 'status' | 'createdAt'>
): Promise<void> {
  try {
    const newDocRef = doc(collection(db, 'contact'));
    const enquiryData: ContactEnquiry = {
      ...data,
      id: newDocRef.id,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    await setDoc(newDocRef, enquiryData);
  } catch (err) {
    console.error('Error submitting contact enquiry:', err);
    throw err;
  }
}
