import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updatePassword as fbUpdatePassword
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AdminUser, AdminCredentials } from '../types';

const DEFAULT_ADMIN_USERNAME = 'admincpg';
const DEFAULT_ADMIN_PASSWORD = 'Test@123@';
const DEFAULT_ADMIN_EMAIL = 'admincpg@cauverypolytechnic.edu.in';

interface AuthContextType {
  user: User | null;
  adminProfile: AdminUser | null;
  isAuthenticated: boolean;
  adminCredentials: AdminCredentials;
  loading: boolean;
  error: string | null;
  login: (identifier: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  quickDemoLogin: () => Promise<void>;
  loginAsDemoAdmin: () => Promise<void>;
  updateAdminPassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  updateAdminCredentials: (username: string, currentPass: string, newPass?: string) => Promise<{ success: boolean; message: string }>;
  createAdminAccount: (email: string, pass: string, displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic admin credentials stored in Firestore & fallback to localStorage
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>(() => {
    const local = localStorage.getItem('cpg_admin_credentials');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {}
    }
    return {
      username: DEFAULT_ADMIN_USERNAME,
      password: DEFAULT_ADMIN_PASSWORD,
      email: DEFAULT_ADMIN_EMAIL,
      updatedAt: new Date().toISOString()
    };
  });

  // Load credentials from Firestore settings doc on boot
  useEffect(() => {
    const fetchAdminSettings = async () => {
      try {
        const credsDoc = await getDoc(doc(db, 'settings', 'admin_auth'));
        if (credsDoc.exists()) {
          const data = credsDoc.data() as AdminCredentials;
          if (data && data.username && data.password) {
            setAdminCredentials(data);
            localStorage.setItem('cpg_admin_credentials', JSON.stringify(data));
          }
        } else {
          // Initialize initial doc in Firestore
          const initialCreds: AdminCredentials = {
            username: DEFAULT_ADMIN_USERNAME,
            password: DEFAULT_ADMIN_PASSWORD,
            email: DEFAULT_ADMIN_EMAIL,
            updatedAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'settings', 'admin_auth'), initialCreds);
        }
      } catch (e) {
        console.warn('Using local credentials storage fallback for admin', e);
      }
    };

    fetchAdminSettings();
  }, []);

  useEffect(() => {
    // Check local demo admin session first
    const demoSession = localStorage.getItem('cpg_demo_admin_user');
    if (demoSession) {
      try {
        const parsed = JSON.parse(demoSession);
        setAdminProfile(parsed);
      } catch (e) {}
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create profile
        try {
          const userDocRef = doc(db, 'admins', currentUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            setAdminProfile(snap.data() as AdminUser);
          } else {
            const profile: AdminUser = {
              uid: currentUser.uid,
              email: currentUser.email || DEFAULT_ADMIN_EMAIL,
              displayName: currentUser.displayName || 'Administrator (admincpg)',
              role: 'superadmin',
              lastLogin: new Date().toISOString()
            };
            await setDoc(userDocRef, profile);
            setAdminProfile(profile);
          }
        } catch (e) {
          // Fallback admin profile if firestore read rule is restricted
          setAdminProfile({
            uid: currentUser.uid,
            email: currentUser.email || DEFAULT_ADMIN_EMAIL,
            displayName: currentUser.displayName || 'Administrator (admincpg)',
            role: 'superadmin'
          });
        }
      } else if (!demoSession) {
        // Only clear if no custom admin session
        const customSession = localStorage.getItem('cpg_admin_active_session');
        if (customSession) {
          try {
            setAdminProfile(JSON.parse(customSession));
          } catch (e) {
            setAdminProfile(null);
          }
        } else {
          setAdminProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (identifier: string, pass: string) => {
    setError(null);
    const cleanId = identifier.trim();
    const cleanPass = pass.trim();

    // 1. Direct check against configured Admin credentials (e.g. username 'admincpg' and password 'Test@123@')
    const currentUsername = adminCredentials.username || DEFAULT_ADMIN_USERNAME;
    const currentPassword = adminCredentials.password || DEFAULT_ADMIN_PASSWORD;
    const currentEmail = adminCredentials.email || DEFAULT_ADMIN_EMAIL;

    const isUsernameMatch = cleanId.toLowerCase() === currentUsername.toLowerCase();
    const isEmailMatch = cleanId.toLowerCase() === currentEmail.toLowerCase() || cleanId.toLowerCase() === 'admin@cauverypolytechnic.edu.in';
    const isPasswordMatch = cleanPass === currentPassword;

    if ((isUsernameMatch || isEmailMatch) && isPasswordMatch) {
      const activeAdmin: AdminUser = {
        uid: 'admin-cpg-principal',
        email: currentEmail,
        displayName: `Administrator (${currentUsername})`,
        role: 'superadmin',
        lastLogin: new Date().toISOString()
      };
      localStorage.setItem('cpg_admin_active_session', JSON.stringify(activeAdmin));
      localStorage.setItem('cpg_demo_admin_user', JSON.stringify(activeAdmin));
      setAdminProfile(activeAdmin);

      // Attempt background Firebase Auth login/signup with equivalent email
      const fbEmail = cleanId.includes('@') ? cleanId : `${cleanId}@cauverypolytechnic.edu.in`;
      try {
        await signInWithEmailAndPassword(auth, fbEmail, cleanPass);
      } catch (err: any) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          try {
            await createUserWithEmailAndPassword(auth, fbEmail, cleanPass);
          } catch (createErr) {
            // Offline/Rules fallback already succeeded above
          }
        }
      }
      return;
    }

    // 2. If entered an email format and not matched above, try standard Firebase Auth
    if (cleanId.includes('@')) {
      try {
        await signInWithEmailAndPassword(auth, cleanId, cleanPass);
        return;
      } catch (err: any) {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          try {
            await createUserWithEmailAndPassword(auth, cleanId, cleanPass);
            return;
          } catch (createErr) {
            // throw primary error below
          }
        }
        const msg = err.message || 'Invalid email or password.';
        setError(msg);
        throw new Error(msg);
      }
    }

    const invalidMsg = 'Invalid username or password. Please check your credentials.';
    setError(invalidMsg);
    throw new Error(invalidMsg);
  };

  const quickDemoLogin = async () => {
    const currentUsername = adminCredentials.username || DEFAULT_ADMIN_USERNAME;
    const currentEmail = adminCredentials.email || DEFAULT_ADMIN_EMAIL;
    const demoUser: AdminUser = {
      uid: 'demo-admin-cauvery-01',
      email: currentEmail,
      displayName: `Principal / Super Administrator (${currentUsername})`,
      role: 'superadmin',
      lastLogin: new Date().toISOString()
    };
    localStorage.setItem('cpg_demo_admin_user', JSON.stringify(demoUser));
    localStorage.setItem('cpg_admin_active_session', JSON.stringify(demoUser));
    setAdminProfile(demoUser);
  };

  const loginAsDemoAdmin = quickDemoLogin;

  const updateAdminPassword = async (currentPass: string, newPass: string): Promise<{ success: boolean; message: string }> => {
    const currentStoredPass = adminCredentials.password || DEFAULT_ADMIN_PASSWORD;

    if (currentPass !== currentStoredPass) {
      return { success: false, message: 'Current password does not match existing password.' };
    }

    if (!newPass || newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters long.' };
    }

    const updated: AdminCredentials = {
      ...adminCredentials,
      password: newPass,
      updatedAt: new Date().toISOString()
    };

    // Update in state & localStorage
    setAdminCredentials(updated);
    localStorage.setItem('cpg_admin_credentials', JSON.stringify(updated));

    // Persist in Firestore
    try {
      await setDoc(doc(db, 'settings', 'admin_auth'), updated, { merge: true });
    } catch (e) {
      console.warn('Could not sync password update to Firestore, stored locally', e);
    }

    // Try updating Firebase Auth password if active
    if (auth.currentUser) {
      try {
        await fbUpdatePassword(auth.currentUser, newPass);
      } catch (fbErr) {
        console.warn('Firebase Auth password update skipped', fbErr);
      }
    }

    return { success: true, message: 'Admin password updated successfully!' };
  };

  const updateAdminCredentials = async (
    username: string, 
    currentPass: string, 
    newPass?: string
  ): Promise<{ success: boolean; message: string }> => {
    const currentStoredPass = adminCredentials.password || DEFAULT_ADMIN_PASSWORD;

    if (currentPass !== currentStoredPass) {
      return { success: false, message: 'Current password verification failed. Please enter your existing password.' };
    }

    if (!username || username.trim().length < 3) {
      return { success: false, message: 'Username must be at least 3 characters long.' };
    }

    const updated: AdminCredentials = {
      ...adminCredentials,
      username: username.trim(),
      password: (newPass && newPass.trim().length >= 6) ? newPass.trim() : currentStoredPass,
      updatedAt: new Date().toISOString()
    };

    setAdminCredentials(updated);
    localStorage.setItem('cpg_admin_credentials', JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'settings', 'admin_auth'), updated, { merge: true });
    } catch (e) {
      console.warn('Could not sync credentials update to Firestore', e);
    }

    return { 
      success: true, 
      message: newPass 
        ? 'Admin username and password updated successfully!' 
        : 'Admin username updated successfully!' 
    };
  };

  const createAdminAccount = async (email: string, pass: string, displayName: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    const profile: AdminUser = {
      uid: cred.user.uid,
      email,
      displayName,
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'admins', cred.user.uid), profile);
  };

  const logout = async () => {
    localStorage.removeItem('cpg_demo_admin_user');
    localStorage.removeItem('cpg_admin_active_session');
    setAdminProfile(null);
    setUser(null);
    try {
      await fbSignOut(auth);
    } catch (e) {}
  };

  const isAuthenticated = !!user || !!adminProfile;

  return (
    <AuthContext.Provider
      value={{
        user,
        adminProfile,
        isAuthenticated,
        adminCredentials,
        loading,
        error,
        login,
        logout,
        quickDemoLogin,
        loginAsDemoAdmin,
        updateAdminPassword,
        updateAdminCredentials,
        createAdminAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
