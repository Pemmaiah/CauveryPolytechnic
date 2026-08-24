import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MenuItem } from '../../types';
import { 
  Menu as MenuIcon, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  GraduationCap, 
  Lock,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (url: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { menus, settings } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  }, [currentPath]);

  // Construct hierarchal menu tree from menus collection
  const activeMenus = menus.filter((m) => m.active).sort((a, b) => a.order - b.order);
  const rootMenus = activeMenus.filter((m) => !m.parentId);

  const getChildren = (parentId: string): MenuItem[] => {
    return activeMenus.filter((m) => m.parentId === parentId).sort((a, b) => a.order - b.order);
  };

  const toggleMobileSubmenu = (id: string) => {
    setMobileExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-slate-100 transition-all duration-300">
      {/* Institutional Top Header Bar */}
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 sm:px-6 lg:px-8 text-xs border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-[11px] font-medium text-slate-300">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AICTE New Delhi Approved • DTE Karnataka Code: <strong>{settings.dsaCode || '494'}</strong></span>
            </span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Gonikoppal, Kodagu, Karnataka - 571213</span>
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors">
              <Phone className="w-3 h-3 text-amber-500" />
              <span>{settings.phone}</span>
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors hidden sm:flex">
              <Mail className="w-3 h-3 text-amber-500" />
              <span>{settings.email}</span>
            </a>
            <button
              onClick={() => onNavigate('/admin/login')}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-amber-300 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-700 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Logo & Identity Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 border-2 border-amber-500 shadow-md flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-blue-950 uppercase leading-tight font-serif">
                {settings.collegeName || 'Cauvery Polytechnic'}
              </h1>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-300 hidden sm:inline">
                ESTD. KODAGU
              </span>
            </div>
            <p className="text-xs font-semibold text-amber-700 tracking-wide uppercase">
              Gonikoppal, South Kodagu, Karnataka
            </p>
            <p className="text-[11px] text-slate-500 hidden md:block leading-tight mt-0.5">
              {settings.affiliation || 'Approved by AICTE, New Delhi & Affiliated to DTE Bengaluru'}
            </p>
          </div>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admission')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-slate-950" />
            <span>Apply Online 2026-27</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-blue-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar (Desktop) */}
      <nav className="bg-blue-950 text-white border-t border-blue-900/60 hidden lg:block shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {rootMenus.map((menu) => {
              const children = menu.children || getChildren(menu.id);
              const hasChildren = children && children.length > 0;
              const isActive = currentPath === menu.url || (menu.url !== '/' && currentPath.startsWith(menu.url));

              return (
                <li
                  key={menu.id}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(menu.id)}
                  onMouseLeave={() => {
                    setOpenDropdown(null);
                    setOpenSubDropdown(null);
                  }}
                >
                  <div
                    onClick={() => onNavigate(menu.url)}
                    className={`px-3.5 py-3 flex items-center gap-1.5 cursor-pointer transition-colors duration-150 text-xs uppercase tracking-wider font-semibold border-b-2 ${
                      isActive
                        ? 'border-amber-400 text-amber-400 bg-blue-900/50'
                        : 'border-transparent text-slate-100 hover:text-amber-300 hover:bg-blue-900/40'
                    }`}
                  >
                    <span>{menu.title}</span>
                    {hasChildren && <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />}
                  </div>

                  {/* Level 2 Dropdown */}
                  {hasChildren && openDropdown === menu.id && (
                    <div className="absolute left-0 top-full w-64 bg-slate-900 text-slate-100 rounded-b-xl shadow-2xl border border-blue-900/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {children.map((sub) => {
                        const subChildren = sub.children || getChildren(sub.id);
                        const hasSubChildren = subChildren && subChildren.length > 0;

                        return (
                          <div
                            key={sub.id}
                            className="relative"
                            onMouseEnter={() => setOpenSubDropdown(sub.id)}
                            onMouseLeave={() => setOpenSubDropdown(null)}
                          >
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigate(sub.url);
                                setOpenDropdown(null);
                              }}
                              className="px-4 py-2 text-xs flex items-center justify-between hover:bg-blue-900/70 hover:text-amber-300 cursor-pointer transition-colors"
                            >
                              <span>{sub.title}</span>
                              {hasSubChildren && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                            </div>

                            {/* Level 3 Dropdown */}
                            {hasSubChildren && openSubDropdown === sub.id && (
                              <div className="absolute left-full top-0 w-60 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-blue-900/80 py-2 z-50 ml-1 animate-in fade-in slide-in-from-left-2 duration-150">
                                {subChildren.map((subSub) => (
                                  <div
                                    key={subSub.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onNavigate(subSub.url);
                                      setOpenDropdown(null);
                                      setOpenSubDropdown(null);
                                    }}
                                    className="px-4 py-2 text-xs hover:bg-blue-900/70 hover:text-amber-300 cursor-pointer transition-colors"
                                  >
                                    {subSub.title}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white border-t border-slate-800 shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="p-4 space-y-1">
            {rootMenus.map((menu) => {
              const children = menu.children || getChildren(menu.id);
              const hasChildren = children && children.length > 0;
              const isExpanded = mobileExpanded[menu.id];

              return (
                <div key={menu.id} className="border-b border-slate-800/80 pb-1">
                  <div className="flex items-center justify-between py-2">
                    <button
                      onClick={() => {
                        onNavigate(menu.url);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left font-semibold text-sm text-slate-100 hover:text-amber-400 transition-colors flex-1"
                    >
                      {menu.title}
                    </button>
                    {hasChildren && (
                      <button
                        onClick={() => toggleMobileSubmenu(menu.id)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Mobile Level 2 */}
                  {hasChildren && isExpanded && (
                    <div className="pl-4 pb-2 space-y-1 border-l-2 border-amber-500/50 my-1 ml-2">
                      {children.map((sub) => {
                        const subChildren = sub.children || getChildren(sub.id);
                        const hasSubChildren = subChildren && subChildren.length > 0;
                        const isSubExpanded = mobileExpanded[sub.id];

                        return (
                          <div key={sub.id}>
                            <div className="flex items-center justify-between py-1.5 text-xs text-slate-300">
                              <button
                                onClick={() => {
                                  onNavigate(sub.url);
                                  setMobileMenuOpen(false);
                                }}
                                className="text-left hover:text-amber-300 flex-1"
                              >
                                {sub.title}
                              </button>
                              {hasSubChildren && (
                                <button
                                  onClick={() => toggleMobileSubmenu(sub.id)}
                                  className="p-1 text-slate-400"
                                >
                                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSubExpanded ? 'rotate-180' : ''}`} />
                                </button>
                              )}
                            </div>

                            {/* Mobile Level 3 */}
                            {hasSubChildren && isSubExpanded && (
                              <div className="pl-3 py-1 space-y-1 text-[11px] text-slate-400 border-l border-slate-700 ml-2">
                                {subChildren.map((subSub) => (
                                  <button
                                    key={subSub.id}
                                    onClick={() => {
                                      onNavigate(subSub.url);
                                      setMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left py-1 hover:text-amber-300"
                                  >
                                    • {subSub.title}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Footer Shortcuts */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate('/admission');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider text-center"
              >
                Apply Online 2026-27
              </button>
              <button
                onClick={() => {
                  onNavigate('/admin/login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg text-xs flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Admin CMS Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
