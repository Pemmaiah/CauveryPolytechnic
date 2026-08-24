import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CMSProvider, useCMS } from './context/CMSContext';

// Public Components & Views
import { Navbar } from './components/public/Navbar';
import { PublicFooter } from './components/public/PublicFooter';
import { HomeView } from './views/public/HomeView';
import { ProgrammesView } from './views/public/ProgrammesView';
import { EventsView } from './views/public/EventsView';
import { NewsView } from './views/public/NewsView';
import { NewsDetailView } from './views/public/NewsDetailView';
import { GalleryView } from './views/public/GalleryView';
import { FacilitiesView } from './views/public/FacilitiesView';
import { AicteView } from './views/public/AicteView';
import { AdmissionView } from './views/public/AdmissionView';
import { ContactView } from './views/public/ContactView';
import { DynamicPageView } from './views/public/DynamicPageView';

// Admin Views
import { AdminLoginView } from './views/admin/AdminLoginView';
import { AdminLayout } from './views/admin/AdminLayout';
import { AdminDashboardOverview } from './views/admin/AdminDashboardOverview';
import { AdminSliderManager } from './views/admin/AdminSliderManager';
import { AdminMenuManager } from './views/admin/AdminMenuManager';
import { AdminPageManager } from './views/admin/AdminPageManager';
import { AdminProgrammesManager } from './views/admin/AdminProgrammesManager';
import { AdminNewsManager } from './views/admin/AdminNewsManager';
import { AdminEventsManager } from './views/admin/AdminEventsManager';
import { AdminGalleryManager } from './views/admin/AdminGalleryManager';
import { AdminFacilitiesManager } from './views/admin/AdminFacilitiesManager';
import { AdminAicteManager } from './views/admin/AdminAicteManager';
import { AdminAdmissionsManager } from './views/admin/AdminAdmissionsManager';
import { AdminEnquiriesManager } from './views/admin/AdminEnquiriesManager';
import { AdminSettingsManager } from './views/admin/AdminSettingsManager';

const AppContent: React.FC = () => {
  const { user, adminProfile, isAuthenticated } = useAuth();
  const { loading } = useCMS();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [adminTab, setAdminTab] = useState<string>('dashboard');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (url: string) => {
    // Normalizing URL
    let target = url;
    if (target.startsWith('#')) {
      target = target.substring(1);
    }
    if (!target.startsWith('/')) {
      target = '/' + target;
    }

    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
    }
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if on admin route
  const isAdminRoute = currentPath.startsWith('/admin');

  // Render Admin View
  if (isAdminRoute) {
    if (!isAuthenticated && !user && !adminProfile) {
      return (
        <AdminLoginView
          onLoginSuccess={() => navigateTo('/admin')}
          onNavigateHome={() => navigateTo('/')}
        />
      );
    }

    const renderAdminTabContent = () => {
      switch (adminTab) {
        case 'dashboard':
          return <AdminDashboardOverview onSelectTab={setAdminTab} />;
        case 'sliders':
          return <AdminSliderManager />;
        case 'menus':
          return <AdminMenuManager />;
        case 'pages':
          return <AdminPageManager />;
        case 'programmes':
          return <AdminProgrammesManager />;
        case 'news':
          return <AdminNewsManager />;
        case 'events':
          return <AdminEventsManager />;
        case 'gallery':
          return <AdminGalleryManager />;
        case 'facilities':
          return <AdminFacilitiesManager />;
        case 'aicte':
          return <AdminAicteManager />;
        case 'admissions':
          return <AdminAdmissionsManager />;
        case 'enquiries':
          return <AdminEnquiriesManager />;
        case 'settings':
          return <AdminSettingsManager />;
        default:
          return <AdminDashboardOverview onSelectTab={setAdminTab} />;
      }
    };

    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={setAdminTab}
        onNavigateHome={() => navigateTo('/')}
      >
        {renderAdminTabContent()}
      </AdminLayout>
    );
  }

  // Render Public Route
  const renderPublicView = () => {
    if (currentPath === '/' || currentPath === '/home') {
      return <HomeView onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('/programmes')) {
      const parts = currentPath.split('/');
      const selectedCode = parts[2];
      return <ProgrammesView onNavigate={navigateTo} selectedCourseCode={selectedCode} />;
    }

    if (currentPath === '/events') {
      return <EventsView onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('/news/')) {
      const slug = currentPath.replace('/news/', '');
      return <NewsDetailView slug={slug} onNavigate={navigateTo} />;
    }

    if (currentPath === '/news') {
      return <NewsView onNavigate={navigateTo} />;
    }

    if (currentPath === '/gallery') {
      return <GalleryView onNavigate={navigateTo} />;
    }

    if (currentPath === '/facilities') {
      return <FacilitiesView onNavigate={navigateTo} />;
    }

    if (currentPath === '/aicte') {
      return <AicteView onNavigate={navigateTo} />;
    }

    if (currentPath === '/admission') {
      return <AdmissionView onNavigate={navigateTo} />;
    }

    if (currentPath === '/contact') {
      return <ContactView onNavigate={navigateTo} />;
    }

    if (currentPath.startsWith('/pages/')) {
      const slug = currentPath.replace('/pages/', '');
      return <DynamicPageView slug={slug} onNavigate={navigateTo} />;
    }

    // Default fallback to HomeView
    return <HomeView onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />
      <main className="flex-1">
        {renderPublicView()}
      </main>
      <PublicFooter onNavigate={navigateTo} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <AppContent />
      </CMSProvider>
    </AuthProvider>
  );
}
