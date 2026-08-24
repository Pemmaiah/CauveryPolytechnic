import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { CinematicHeroSlider } from '../../components/public/CinematicHeroSlider';
import { WhyUsSection } from '../../components/public/WhyUsSection';
import { ProgrammesSection } from '../../components/public/ProgrammesSection';
import { EventsSection } from '../../components/public/EventsSection';
import { LatestNewsSection } from '../../components/public/LatestNewsSection';
import { FacilitiesSection } from '../../components/public/FacilitiesSection';
import { GallerySection } from '../../components/public/GallerySection';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (url: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { settings } = useCMS();

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Video-Style Hero Slider */}
      <CinematicHeroSlider onNavigate={onNavigate} />

      {/* 2. Principal's Welcome Message & Key Affiliation Highlights */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Principal Photo & Card */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative w-48 sm:w-56 h-60 sm:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 ring-2 ring-slate-200">
                <img
                  src={settings.principalPhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'}
                  alt={settings.principalName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 p-3 text-white">
                  <p className="text-xs font-bold font-serif">{settings.principalName}</p>
                  <p className="text-[10px] text-amber-400">{settings.principalQualification}</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Principal's Welcome</p>
                <h3 className="text-base font-extrabold text-blue-950">{settings.principalName}</h3>
              </div>
            </div>

            {/* Quote & Narrative */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-blue-800" />
                <span>Nurturing Technical Excellence in Kodagu</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-serif leading-tight">
                "Empowering youth with tactile engineering knowledge, ethical values, and boundless career horizons."
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {settings.principalMessage || 'Welcome to Cauvery Polytechnic, Gonikoppal. Our institution is dedicated to imparting quality technical education that bridges the gap between academic theory and modern industrial engineering practices.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>AICTE Approved Diploma Programs</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Affiliated to DTE Karnataka (Code: 494)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pre-Placement Soft Skills & Interviews</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>SSP & NSP Scholarships Facilitated</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/pages/principals-desk')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 hover:text-amber-600 uppercase tracking-wider transition-colors"
                >
                  <span>Read Full Principal's Message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <WhyUsSection onNavigate={onNavigate} />

      {/* 4. Programmes Showcase */}
      <ProgrammesSection onNavigate={onNavigate} />

      {/* 5. Online Admission CTA Hero Strip */}
      <section className="py-14 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/40">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Admissions 2026-27 Open</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-white leading-tight">
              Begin Your Journey as an Engineering Professional
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Direct spot admission and online seat reservation available for SSLC and ITI passouts. Merit concessions & hostel facility available.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/admission')}
              className="px-7 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Apply Online Now
            </button>
            <button
              onClick={() => onNavigate('/pages/fee-structure')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all"
            >
              Fee Structure
            </button>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Events */}
      <EventsSection onNavigate={onNavigate} />

      {/* 7. Latest News */}
      <LatestNewsSection onNavigate={onNavigate} />

      {/* 8. Campus Facilities Showcase */}
      <FacilitiesSection onNavigate={onNavigate} />

      {/* 9. Gallery Preview */}
      <GallerySection onNavigate={onNavigate} />

      {/* 10. Connect & Live Google Map */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Contact Details Card */}
            <div className="lg:col-span-5 bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Campus Location</span>
                </div>
                <h3 className="text-2xl font-extrabold text-blue-950 font-serif">
                  Visit Cauvery Polytechnic
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Conveniently situated in Gonikoppal, South Kodagu, accessible via regular bus connectivity from Mysuru, Madikeri, Virajpet, and Kerala borders.
                </p>

                <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                    <span>{settings.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-900 shrink-0" />
                    <span>{settings.phone} / {settings.mobile}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-900 shrink-0" />
                    <span>{settings.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-3">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="flex-1 py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors text-center"
                >
                  Send Enquiry
                </button>
                <button
                  onClick={() => onNavigate('/admission')}
                  className="py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors text-center"
                >
                  Admissions
                </button>
              </div>
            </div>

            {/* Google Map Container (Dynamic embed from CMS) */}
            <div className="lg:col-span-7 h-[360px] lg:h-auto rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-200">
              <iframe
                title="Cauvery Polytechnic Location Map"
                src={settings.googleMapEmbed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15604.83856554795!2d75.8872583871582!3d12.138760000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5b5505e60807b%3A0x6b4fb66904d9c733!2sGonikoppal%2C%20Karnataka%20571213!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
