import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Twitter, 
  ArrowRight,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface PublicFooterProps {
  onNavigate: (url: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  const { footer, settings } = useCMS();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: About Institution */}
          <div className="space-y-4">
            <div 
              onClick={() => onNavigate('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-900 border border-amber-500 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white uppercase font-serif leading-tight">
                  {settings.collegeName || 'Cauvery Polytechnic'}
                </h3>
                <p className="text-xs font-semibold text-amber-400 uppercase">Gonikoppal, Kodagu</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {footer.aboutText}
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AICTE Approved • DTE Karnataka College Code: <strong>{settings.dsaCode || '494'}</strong></span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b-2 border-amber-500 pb-2 inline-block mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footer.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.url)}
                    className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-left group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Important & Statutory Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b-2 border-amber-500 pb-2 inline-block mb-4">
              Statutory Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {footer.importantLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.url)}
                    className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-left group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6 pt-4 border-t border-slate-900">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Connect With Us</p>
              <div className="flex items-center gap-2.5">
                {footer.socialLinks.facebook && (
                  <a
                    href={footer.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {footer.socialLinks.instagram && (
                  <a
                    href={footer.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {footer.socialLinks.youtube && (
                  <a
                    href={footer.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {footer.socialLinks.linkedin && (
                  <a
                    href={footer.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-blue-500 text-slate-300 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {footer.socialLinks.twitter && (
                  <a
                    href={footer.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-sky-500 text-slate-300 hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-3.5 text-xs sm:text-sm">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b-2 border-amber-500 pb-2 inline-block mb-1">
              Campus Contact
            </h4>
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{footer.address || settings.address}</p>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <a href={`tel:${footer.phone || settings.phone}`} className="hover:text-amber-400">
                {footer.phone || settings.phone} / {footer.mobile || settings.mobile}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <a href={`mailto:${footer.email || settings.email}`} className="hover:text-amber-400">
                {footer.email || settings.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400 text-xs">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>{footer.officeHours || 'Mon - Sat: 9:00 AM - 4:30 PM'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{footer.copyrightText || `© 2026 Cauvery Polytechnic. All Rights Reserved.`}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/pages/mandatory-disclosure')}
              className="hover:text-slate-400 transition-colors"
            >
              Mandatory Disclosure
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('/pages/anti-ragging')}
              className="hover:text-slate-400 transition-colors"
            >
              Anti-Ragging
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('/admin/login')}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold"
            >
              <Lock className="w-3 h-3" />
              <span>CMS Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
