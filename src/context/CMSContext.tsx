import React, { createContext, useContext, useEffect, useState } from 'react';
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
  initialFooter, 
  initialSettings 
} from '../lib/initialData';
import { 
  subscribeCollection, 
  subscribeDoc, 
  saveDocument, 
  deleteDocument, 
  updateDocumentOrder,
  initializeFirestoreDatabase,
  submitAdmissionApplication,
  submitContactEnquiry
} from '../lib/firestoreService';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface CMSContextType {
  // State
  sliders: SliderItem[];
  menus: MenuItem[];
  pages: PageItem[];
  programmes: ProgrammeItem[];
  news: NewsItem[];
  events: EventItem[];
  facilities: FacilityItem[];
  gallery: GalleryItem[];
  whyUs: WhyUsItem[];
  aicte: AicteItem[];
  admissions: AdmissionApplication[];
  enquiries: ContactEnquiry[];
  contactEnquiries: ContactEnquiry[];
  ticker: TickerItem[];
  footer: FooterConfig;
  settings: WebsiteSettings;
  loading: boolean;

  // Sliders
  saveSlider: (slide: Partial<SliderItem>) => Promise<void>;
  addSlider: (slide: Omit<SliderItem, 'id'>) => Promise<string>;
  updateSlider: (id: string, slide: Partial<SliderItem>) => Promise<void>;
  deleteSlider: (id: string) => Promise<void>;
  reorderSliders: (items: SliderItem[]) => Promise<void>;

  // Menus
  saveMenu: (item: Partial<MenuItem>) => Promise<void>;
  addMenu: (item: Omit<MenuItem, 'id'>) => Promise<string>;
  updateMenu: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenu: (id: string) => Promise<void>;
  reorderMenus: (items: MenuItem[]) => Promise<void>;

  // Pages
  savePage: (page: Partial<PageItem>) => Promise<void>;
  addPage: (page: Omit<PageItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updatePage: (id: string, page: Partial<PageItem>) => Promise<void>;
  deletePage: (id: string) => Promise<void>;

  // Programmes
  saveProgramme: (prog: Partial<ProgrammeItem>) => Promise<void>;
  addProgramme: (prog: Omit<ProgrammeItem, 'id'>) => Promise<string>;
  updateProgramme: (id: string, prog: Partial<ProgrammeItem>) => Promise<void>;
  deleteProgramme: (id: string) => Promise<void>;

  // News
  saveNews: (item: Partial<NewsItem>) => Promise<void>;
  addNews: (item: Omit<NewsItem, 'id' | 'createdAt'>) => Promise<string>;
  updateNews: (id: string, item: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;

  // Events
  saveEvent: (event: Partial<EventItem>) => Promise<void>;
  addEvent: (event: Omit<EventItem, 'id'>) => Promise<string>;
  updateEvent: (id: string, event: Partial<EventItem>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  // Facilities
  saveFacility: (fac: Partial<FacilityItem>) => Promise<void>;
  addFacility: (fac: Omit<FacilityItem, 'id'>) => Promise<string>;
  updateFacility: (id: string, fac: Partial<FacilityItem>) => Promise<void>;
  deleteFacility: (id: string) => Promise<void>;

  // Gallery
  saveGalleryItem: (item: Partial<GalleryItem>) => Promise<void>;
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'createdAt'>) => Promise<string>;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  // Why Us
  saveWhyUs: (item: Partial<WhyUsItem>) => Promise<void>;
  deleteWhyUs: (id: string) => Promise<void>;

  // AICTE
  saveAicte: (item: Partial<AicteItem>) => Promise<void>;
  addAicteDoc: (item: Omit<AicteItem, 'id' | 'uploadedAt'>) => Promise<string>;
  updateAicteDoc: (id: string, item: Partial<AicteItem>) => Promise<void>;
  deleteAicteDoc: (id: string) => Promise<void>;
  deleteAicte: (id: string) => Promise<void>;

  // Ticker
  saveTicker: (item: Partial<TickerItem>) => Promise<void>;
  deleteTicker: (id: string) => Promise<void>;

  // Footer & Settings
  updateFooter: (data: Partial<FooterConfig>) => Promise<void>;
  updateSettings: (data: Partial<WebsiteSettings>) => Promise<void>;

  // Admissions
  submitApplication: (data: any) => Promise<string>;
  addAdmission: (data: any) => Promise<string>;
  updateApplicationStatus: (id: string, status: AdmissionApplication['status'], notes?: string) => Promise<void>;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status'], notes?: string) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  deleteAdmission: (id: string) => Promise<void>;

  // Contact Enquiries
  sendEnquiry: (data: any) => Promise<void>;
  addEnquiry: (data: any) => Promise<void>;
  updateEnquiryStatus: (id: string, status: ContactEnquiry['status'], notes?: string) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;

  // Utilities
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  resetToDemoData: () => Promise<void>;
  resetToInitialData: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sliders, setSliders] = useState<SliderItem[]>(initialSliders);
  const [menus, setMenus] = useState<MenuItem[]>(initialMenus);
  const [pages, setPages] = useState<PageItem[]>(initialPages);
  const [programmes, setProgrammes] = useState<ProgrammeItem[]>(initialProgrammes);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [facilities, setFacilities] = useState<FacilityItem[]>(initialFacilities);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [whyUs, setWhyUs] = useState<WhyUsItem[]>(initialWhyUs);
  const [aicte, setAicte] = useState<AicteItem[]>(initialAicte);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [contactEnquiries, setContactEnquiries] = useState<ContactEnquiry[]>([]);
  const [ticker, setTicker] = useState<TickerItem[]>(initialTicker);
  const [footer, setFooter] = useState<FooterConfig>(initialFooter);
  const [settings, setSettings] = useState<WebsiteSettings>(initialSettings);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initialize DB on boot & set up live listeners
  useEffect(() => {
    initializeFirestoreDatabase();

    const unsubSliders = subscribeCollection<SliderItem>('sliders', 'sliders', initialSliders, setSliders, 'displayOrder');
    const unsubMenus = subscribeCollection<MenuItem>('menus', 'menus', initialMenus, setMenus, 'order');
    const unsubPages = subscribeCollection<PageItem>('pages', 'pages', initialPages, setPages, 'title');
    const unsubProgrammes = subscribeCollection<ProgrammeItem>('programmes', 'programmes', initialProgrammes, setProgrammes, 'displayOrder');
    const unsubNews = subscribeCollection<NewsItem>('news', 'news', initialNews, setNews, 'publishedDate');
    const unsubEvents = subscribeCollection<EventItem>('events', 'events', initialEvents, setEvents, 'date');
    const unsubFacilities = subscribeCollection<FacilityItem>('facilities', 'facilities', initialFacilities, setFacilities, 'displayOrder');
    const unsubGallery = subscribeCollection<GalleryItem>('gallery', 'gallery', initialGallery, setGallery, 'displayOrder');
    const unsubWhyUs = subscribeCollection<WhyUsItem>('whyUs', 'whyUs', initialWhyUs, setWhyUs, 'displayOrder');
    const unsubAicte = subscribeCollection<AicteItem>('aicte', 'aicte', initialAicte, setAicte, 'academicYear');
    const unsubAdmissions = subscribeCollection<AdmissionApplication>('admissions', 'admissions', [], setAdmissions, 'createdAt');
    const unsubContact = subscribeCollection<ContactEnquiry>('contact', 'contact', [], setContactEnquiries, 'createdAt');
    const unsubTicker = subscribeCollection<TickerItem>('ticker', 'ticker', initialTicker, setTicker, 'order');

    const unsubFooter = subscribeDoc<FooterConfig>('settings', 'footer', 'footer', initialFooter, setFooter);
    const unsubSettings = subscribeDoc<WebsiteSettings>('settings', 'general', 'settings', initialSettings, setSettings);

    return () => {
      unsubSliders();
      unsubMenus();
      unsubPages();
      unsubProgrammes();
      unsubNews();
      unsubEvents();
      unsubFacilities();
      unsubGallery();
      unsubWhyUs();
      unsubAicte();
      unsubAdmissions();
      unsubContact();
      unsubTicker();
      unsubFooter();
      unsubSettings();
    };
  }, []);

  // CRUD Operations
  const saveSlider = async (slide: Partial<SliderItem>) => {
    const id = slide.id || Date.now().toString();
    const updatedSlide = { ...slide, id } as SliderItem;
    
    // 1. Optimistic React state update
    setSliders((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedSlide };
        return next;
      }
      return [updatedSlide, ...prev];
    });

    // 2. Persist to Firestore & Local cache
    await saveDocument('sliders', updatedSlide, id);
    showToast('Slide Saved', 'Hero slider has been successfully updated.');
    return id;
  };

  const addSlider = async (slide: Omit<SliderItem, 'id'>) => {
    const id = Date.now().toString();
    await saveSlider({ ...slide, id });
    return id;
  };

  const updateSlider = async (id: string, slide: Partial<SliderItem>) => {
    await saveSlider({ ...slide, id });
  };

  const deleteSlider = async (id: string) => {
    // 1. Optimistic React state update
    setSliders((prev) => prev.filter((s) => s.id !== id));
    // 2. Persist delete
    await deleteDocument('sliders', id);
    showToast('Slide Removed', 'Hero slide was removed successfully.');
  };

  const reorderSliders = async (items: SliderItem[]) => {
    setSliders(items);
    await updateDocumentOrder('sliders', items, 'displayOrder');
    showToast('Order Updated', 'Slider order saved.');
  };

  const saveMenu = async (item: Partial<MenuItem>) => {
    const id = item.id || Date.now().toString();
    const updatedMenu = { ...item, id } as MenuItem;

    // 1. Optimistic React state update
    setMenus((prev) => {
      const idx = prev.findIndex((m) => m.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedMenu };
        return next;
      }
      return [...prev, updatedMenu];
    });

    // 2. Persist to Firestore & Local cache
    await saveDocument('menus', updatedMenu, id);
    showToast('Menu Saved', 'Navigation menu item updated.');
    return id;
  };

  const addMenu = async (item: Omit<MenuItem, 'id'>) => {
    const id = Date.now().toString();
    await saveMenu({ ...item, id });
    return id;
  };

  const updateMenu = async (id: string, item: Partial<MenuItem>) => {
    await saveMenu({ ...item, id });
  };

  const deleteMenu = async (id: string) => {
    // 1. Optimistic React state update (remove item and any child items)
    setMenus((prev) => prev.filter((m) => m.id !== id && m.parentId !== id));
    // 2. Persist delete
    await deleteDocument('menus', id);
    showToast('Menu Removed', 'Menu item was removed.');
  };

  const reorderMenus = async (items: MenuItem[]) => {
    setMenus(items);
    await updateDocumentOrder('menus', items, 'order');
    showToast('Menu Order Saved', 'Navigation structure updated.');
  };

  const savePage = async (page: Partial<PageItem>) => {
    const id = page.id || page.slug || Date.now().toString();
    const now = new Date().toISOString();
    const updatedPage = { 
      ...page, 
      id, 
      createdAt: page.createdAt || now, 
      updatedAt: now 
    } as PageItem;

    // 1. Optimistic React state update
    setPages((prev) => {
      const idx = prev.findIndex((p) => p.id === id || p.slug === page.slug);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedPage };
        return next;
      }
      return [updatedPage, ...prev];
    });

    // 2. Persist
    await saveDocument('pages', updatedPage, id);
    showToast('Page Saved', `Page "${updatedPage.title}" updated successfully.`);
    return id;
  };

  const addPage = async (page: Omit<PageItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = page.slug || Date.now().toString();
    const now = new Date().toISOString();
    await savePage({ ...page, id, createdAt: now, updatedAt: now });
    return id;
  };

  const updatePage = async (id: string, page: Partial<PageItem>) => {
    const now = new Date().toISOString();
    await savePage({ ...page, id, updatedAt: now });
  };

  const deletePage = async (id: string) => {
    // 1. Optimistic React state update
    setPages((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
    // 2. Persist delete
    await deleteDocument('pages', id);
    showToast('Page Deleted', 'Page removed permanently.');
  };

  const saveProgramme = async (prog: Partial<ProgrammeItem>) => {
    const id = prog.id || Date.now().toString();
    const updatedProg = { ...prog, id } as ProgrammeItem;

    // 1. Optimistic React state update
    setProgrammes((prev) => {
      const idx = prev.findIndex((p) => p.id === id || p.code === prog.code);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedProg };
        return next;
      }
      return [...prev, updatedProg];
    });

    // 2. Persist
    await saveDocument('programmes', updatedProg, id);
    showToast('Programme Saved', `Academic programme "${updatedProg.name}" saved.`);
    return id;
  };

  const addProgramme = async (prog: Omit<ProgrammeItem, 'id'>) => {
    const id = Date.now().toString();
    await saveProgramme({ ...prog, id });
    return id;
  };

  const updateProgramme = async (id: string, prog: Partial<ProgrammeItem>) => {
    await saveProgramme({ ...prog, id });
  };

  const deleteProgramme = async (id: string) => {
    // 1. Optimistic React state update
    setProgrammes((prev) => prev.filter((p) => p.id !== id));
    // 2. Persist delete
    await deleteDocument('programmes', id);
    showToast('Programme Deleted', 'Programme removed.');
  };

  const saveNews = async (item: Partial<NewsItem>) => {
    const id = item.id || item.slug || Date.now().toString();
    const now = new Date().toISOString();
    const updatedNews = { ...item, id, createdAt: item.createdAt || now } as NewsItem;

    setNews((prev) => {
      const idx = prev.findIndex((n) => n.id === id || n.slug === item.slug);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedNews };
        return next;
      }
      return [updatedNews, ...prev];
    });

    await saveDocument('news', updatedNews, id);
    showToast('News Saved', `Article "${updatedNews.title}" updated.`);
    return id;
  };

  const addNews = async (item: Omit<NewsItem, 'id' | 'createdAt'>) => {
    const id = item.slug || Date.now().toString();
    const now = new Date().toISOString();
    await saveNews({ ...item, id, createdAt: now });
    return id;
  };

  const updateNews = async (id: string, item: Partial<NewsItem>) => {
    const now = new Date().toISOString();
    await saveNews({ ...item, id, updatedAt: now });
  };

  const deleteNews = async (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
    await deleteDocument('news', id);
    showToast('News Deleted', 'News item removed.');
  };

  const saveEvent = async (event: Partial<EventItem>) => {
    const id = event.id || Date.now().toString();
    const updatedEvent = { ...event, id } as EventItem;

    setEvents((prev) => {
      const idx = prev.findIndex((e) => e.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedEvent };
        return next;
      }
      return [updatedEvent, ...prev];
    });

    await saveDocument('events', updatedEvent, id);
    showToast('Event Saved', `Event "${updatedEvent.title}" saved.`);
    return id;
  };

  const addEvent = async (event: Omit<EventItem, 'id'>) => {
    const id = Date.now().toString();
    const now = new Date().toISOString();
    await saveEvent({ ...event, id, createdAt: now });
    return id;
  };

  const updateEvent = async (id: string, event: Partial<EventItem>) => {
    await saveEvent({ ...event, id });
  };

  const deleteEvent = async (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    await deleteDocument('events', id);
    showToast('Event Deleted', 'Event removed.');
  };

  const saveFacility = async (fac: Partial<FacilityItem>) => {
    const id = fac.id || Date.now().toString();
    const updatedFac = { ...fac, id } as FacilityItem;

    setFacilities((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedFac };
        return next;
      }
      return [updatedFac, ...prev];
    });

    await saveDocument('facilities', updatedFac, id);
    showToast('Facility Saved', `Facility "${updatedFac.title}" updated.`);
    return id;
  };

  const addFacility = async (fac: Omit<FacilityItem, 'id'>) => {
    const id = Date.now().toString();
    await saveFacility({ ...fac, id });
    return id;
  };

  const updateFacility = async (id: string, fac: Partial<FacilityItem>) => {
    await saveFacility({ ...fac, id });
  };

  const deleteFacility = async (id: string) => {
    setFacilities((prev) => prev.filter((f) => f.id !== id));
    await deleteDocument('facilities', id);
    showToast('Facility Removed', 'Facility item removed.');
  };

  const saveGalleryItem = async (item: Partial<GalleryItem>) => {
    const id = item.id || Date.now().toString();
    const updatedItem = { ...item, id } as GalleryItem;

    setGallery((prev) => {
      const idx = prev.findIndex((g) => g.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedItem };
        return next;
      }
      return [updatedItem, ...prev];
    });

    await saveDocument('gallery', updatedItem, id);
    showToast('Gallery Updated', 'Photo added to college gallery.');
    return id;
  };

  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    const id = Date.now().toString();
    const now = new Date().toISOString();
    await saveGalleryItem({ ...item, id, createdAt: now, uploadedAt: now });
    return id;
  };

  const updateGalleryItem = async (id: string, item: Partial<GalleryItem>) => {
    await saveGalleryItem({ ...item, id });
  };

  const deleteGalleryItem = async (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    await deleteDocument('gallery', id);
    showToast('Photo Removed', 'Image removed from gallery.');
  };

  const saveWhyUs = async (item: Partial<WhyUsItem>) => {
    const id = item.id || Date.now().toString();
    const updatedWhyUs = { ...item, id } as WhyUsItem;

    setWhyUs((prev) => {
      const idx = prev.findIndex((w) => w.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedWhyUs };
        return next;
      }
      return [updatedWhyUs, ...prev];
    });

    await saveDocument('whyUs', updatedWhyUs, id);
    showToast('Why Us Updated', 'Advantage item saved.');
    return id;
  };

  const deleteWhyUs = async (id: string) => {
    setWhyUs((prev) => prev.filter((w) => w.id !== id));
    await deleteDocument('whyUs', id);
    showToast('Item Removed', 'Why Us item removed.');
  };

  const saveAicte = async (item: Partial<AicteItem>) => {
    const id = item.id || Date.now().toString();
    const updatedAicte = { ...item, id } as AicteItem;

    setAicte((prev) => {
      const idx = prev.findIndex((a) => a.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedAicte };
        return next;
      }
      return [updatedAicte, ...prev];
    });

    await saveDocument('aicte', updatedAicte, id);
    showToast('AICTE Document Saved', 'Approval document saved.');
    return id;
  };

  const addAicteDoc = async (item: Omit<AicteItem, 'id' | 'uploadedAt'>) => {
    const id = Date.now().toString();
    const now = new Date().toISOString();
    await saveAicte({ ...item, id, uploadedAt: now });
    return id;
  };

  const updateAicteDoc = async (id: string, item: Partial<AicteItem>) => {
    await saveAicte({ ...item, id });
  };

  const deleteAicte = async (id: string) => {
    setAicte((prev) => prev.filter((a) => a.id !== id));
    await deleteDocument('aicte', id);
    showToast('Document Removed', 'AICTE document deleted.');
  };

  const deleteAicteDoc = async (id: string) => {
    await deleteAicte(id);
  };

  const saveTicker = async (item: Partial<TickerItem>) => {
    const id = item.id || Date.now().toString();
    const updatedTicker = { ...item, id } as TickerItem;

    setTicker((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updatedTicker };
        return next;
      }
      return [updatedTicker, ...prev];
    });

    await saveDocument('ticker', updatedTicker, id);
    showToast('Ticker Item Saved', 'Scrolling announcement ticker updated.');
    return id;
  };

  const deleteTicker = async (id: string) => {
    setTicker((prev) => prev.filter((t) => t.id !== id));
    await deleteDocument('ticker', id);
    showToast('Ticker Item Deleted', 'Announcement removed.');
  };

  const updateFooter = async (data: Partial<FooterConfig>) => {
    const merged = { ...footer, ...data };
    setFooter(merged);
    await saveDocument('settings', merged, 'footer');
    showToast('Footer Updated', 'Public website footer updated.');
  };

  const updateSettings = async (data: Partial<WebsiteSettings>) => {
    const merged = { ...settings, ...data };
    setSettings(merged);
    await saveDocument('settings', merged, 'general');
    showToast('Settings Saved', 'College website settings updated.');
  };

  const submitApplication = async (data: any) => {
    const appId = await submitAdmissionApplication(data);
    showToast('Application Submitted!', `Your Application ID is ${appId}`, 'success');
    return appId;
  };

  const addAdmission = async (data: any) => {
    return await submitApplication(data);
  };

  const updateApplicationStatus = async (id: string, status: AdmissionApplication['status'], notes?: string) => {
    try {
      await saveDocument('admissions', { id, status, ...(notes !== undefined ? { notes } : {}) }, id);
      showToast('Status Updated', `Application marked as ${status}.`);
    } catch (e) {
      showToast('Update Failed', 'Could not update status.', 'error');
      throw e;
    }
  };

  const updateAdmissionStatus = async (id: string, status: AdmissionApplication['status'], notes?: string) => {
    await updateApplicationStatus(id, status, notes);
  };

  const deleteApplication = async (id: string) => {
    try {
      await deleteDocument('admissions', id);
      showToast('Application Deleted', 'Record removed.');
    } catch (e) {
      showToast('Delete Failed', 'Could not delete application.', 'error');
      throw e;
    }
  };

  const deleteAdmission = async (id: string) => {
    await deleteApplication(id);
  };

  const sendEnquiry = async (data: any) => {
    await submitContactEnquiry(data);
    showToast('Message Sent', 'Thank you! The college office will contact you soon.', 'success');
  };

  const addEnquiry = async (data: any) => {
    await sendEnquiry(data);
  };

  const updateEnquiryStatus = async (id: string, status: ContactEnquiry['status'], notes?: string) => {
    try {
      await saveDocument('contact', { id, status, ...(notes !== undefined ? { notes } : {}) }, id);
      showToast('Enquiry Updated', `Marked as ${status}.`);
    } catch (e) {
      showToast('Update Failed', 'Could not update enquiry.', 'error');
      throw e;
    }
  };

  const deleteEnquiry = async (id: string) => {
    try {
      await deleteDocument('contact', id);
      showToast('Enquiry Removed', 'Message deleted.');
    } catch (e) {
      showToast('Delete Failed', 'Could not delete enquiry.', 'error');
      throw e;
    }
  };

  const resetToDemoData = async () => {
    await initializeFirestoreDatabase(true);
    showToast('Demo Data Reset', 'Default institution data has been restored in Firestore.');
  };

  const resetToInitialData = async () => {
    await resetToDemoData();
  };

  return (
    <CMSContext.Provider
      value={{
        sliders,
        menus,
        pages,
        programmes,
        news,
        events,
        facilities,
        gallery,
        whyUs,
        aicte,
        admissions,
        enquiries: contactEnquiries,
        contactEnquiries,
        ticker,
        footer,
        settings,
        loading,
        saveSlider,
        addSlider,
        updateSlider,
        deleteSlider,
        reorderSliders,
        saveMenu,
        addMenu,
        updateMenu,
        deleteMenu,
        reorderMenus,
        savePage,
        addPage,
        updatePage,
        deletePage,
        saveProgramme,
        addProgramme,
        updateProgramme,
        deleteProgramme,
        saveNews,
        addNews,
        updateNews,
        deleteNews,
        saveEvent,
        addEvent,
        updateEvent,
        deleteEvent,
        saveFacility,
        addFacility,
        updateFacility,
        deleteFacility,
        saveGalleryItem,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        saveWhyUs,
        deleteWhyUs,
        saveAicte,
        addAicteDoc,
        updateAicteDoc,
        deleteAicteDoc,
        deleteAicte,
        saveTicker,
        deleteTicker,
        updateFooter,
        updateSettings,
        submitApplication,
        addAdmission,
        updateApplicationStatus,
        updateAdmissionStatus,
        deleteApplication,
        deleteAdmission,
        sendEnquiry,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        toasts,
        showToast,
        removeToast,
        resetToDemoData,
        resetToInitialData
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
