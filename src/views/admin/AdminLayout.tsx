import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import { 
  LayoutDashboard, 
  Layers,
  Zap,
  Sliders, 
  Menu as MenuIcon, 
  FileText, 
  GraduationCap, 
  Newspaper, 
  Calendar, 
  Images, 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ExternalLink, 
  X, 
  ChevronRight, 
  RotateCcw,
  Bell,
  KeyRound,
  User
} from 'lucide-react';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onNavigateHome,
  children
}) => {
  const { user, logout, adminCredentials, adminProfile } = useAuth();
  const { admissions, enquiries, resetToInitialData, settings } = useCMS();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  const pendingAdmissionsCount = admissions.filter((a) => a.status === 'pending').length;
  const unreadEnquiriesCount = enquiries.filter((e) => e.status === 'unread').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ticker', label: 'Flash News & Ticker', icon: Zap },
    { id: 'home_layout', label: 'Home Page Sections', icon: Layers },
    { id: 'sliders', label: 'Hero Sliders (Cinematic)', icon: Sliders },
    { id: 'menus', label: 'Navigation Menus', icon: MenuIcon },
    { id: 'pages', label: 'Pages & Content', icon: FileText },
    { id: 'programmes', label: 'Diploma Courses', icon: GraduationCap },
    { id: 'news', label: 'News & Media', icon: Newspaper },
    { id: 'events', label: 'Upcoming Events', icon: Calendar },
    { id: 'gallery', label: 'Photo Gallery', icon: Images },
    { id: 'facilities', label: 'Campus Facilities', icon: Building2 },
    { id: 'aicte', label: 'AICTE Approvals', icon: ShieldCheck },
    { 
      id: 'admissions', 
      label: 'Online Admissions', 
      icon: UserCheck, 
      badge: pendingAdmissionsCount > 0 ? pendingAdmissionsCount : undefined 
    },
    { 
      id: 'enquiries', 
      label: 'Contact Inquiries', 
      icon: MessageSquare, 
      badge: unreadEnquiriesCount > 0 ? unreadEnquiriesCount : undefined 
    },
    { id: 'settings', label: 'College Settings', icon: Settings }
  ];

  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all CMS content to original demo defaults?')) {
      setResetting(true);
      await resetToInitialData();
      setResetting(false);
      alert('CMS Database reset to demo data successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top WP-Style Admin Bar */}
      <header className="bg-slate-900 text-slate-200 h-13 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 shrink-0 z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <MenuIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-900 border border-amber-500 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-white text-xs tracking-tight uppercase">
                {settings.collegeName || 'Cauvery Polytechnic'}
              </span>
              <span className="text-[10px] text-amber-400 font-semibold block leading-none">
                WordPress-Style Admin CMS
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick View Public Website button */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
            title="View Live Public Website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">View Public Website</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={handleResetData}
            disabled={resetting}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
            title="Reset All CMS Collections to Demo Defaults"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
            <span>Reset Demo</span>
          </button>

          {/* Quick Password & Security settings button */}
          <button
            onClick={() => onSelectTab('settings')}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 rounded-lg text-xs font-medium border border-amber-500/30 transition-colors"
            title="Update Admin Credentials & Password"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>Change Password</span>
          </button>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800 text-xs">
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 bg-slate-800 rounded-md border border-slate-700 text-slate-200">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{adminCredentials.username || 'admincpg'}</span>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Dark WordPress-Style Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 top-13 z-20 w-64 bg-slate-950 text-slate-300 border-r border-slate-900 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-3 space-y-1 overflow-y-auto flex-1 scrollbar-thin">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Content Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500 text-slate-950'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer Info */}
          <div className="p-4 border-t border-slate-900 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-400">Cauvery Polytechnic CMS v2.0</p>
            <p>Cloud Firestore Connected</p>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 z-10 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
