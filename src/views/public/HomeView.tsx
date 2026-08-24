import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { HomeSection } from '../../types';
import { initialHomeSections } from '../../lib/initialData';
import { CinematicHeroSlider } from '../../components/public/CinematicHeroSlider';
import { FlashNewsTicker } from '../../components/public/FlashNewsTicker';
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
  BookOpen, 
  TrendingUp, 
  Quote, 
  PlayCircle, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (url: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { homeSections, settings } = useCMS();
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // Active sections sorted by display order
  const rawSections = homeSections && homeSections.length > 0 ? homeSections : initialHomeSections;
  const activeSections = rawSections
    .filter((sec) => sec.enabled !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Background style helper
  const getThemeClasses = (theme?: string) => {
    switch (theme) {
      case 'dark':
        return 'bg-slate-900 text-white';
      case 'slate':
        return 'bg-slate-50 text-slate-900 border-y border-slate-200/80';
      case 'gradient':
        return 'bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white';
      case 'amber':
        return 'bg-amber-500 text-slate-950';
      case 'white':
      default:
        return 'bg-white text-slate-900';
    }
  };

  // Render individual section by type
  const renderSection = (sec: HomeSection) => {
    switch (sec.sectionType) {
      case 'hero_slider':
        return (
          <div key={sec.id} className="relative">
            <FlashNewsTicker onNavigate={onNavigate} />
            <CinematicHeroSlider onNavigate={onNavigate} />
          </div>
        );

      case 'principal_welcome': {
        const photoUrl = sec.imageUrl || settings.principalPhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80';
        const pName = sec.customData?.principalName || settings.principalName;
        const pQual = sec.customData?.principalQualification || settings.principalQualification;
        const checklist = sec.customData?.checklist || [
          'AICTE Approved Diploma Programs',
          'Affiliated to DTE Karnataka (Code: 494)',
          'Pre-Placement Soft Skills & Interviews',
          'SSP & NSP Scholarships Facilitated'
        ];

        return (
          <section key={sec.id} className="py-14 sm:py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Principal Photo & Card */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="relative w-48 sm:w-56 h-60 sm:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 ring-2 ring-slate-200">
                    <img
                      src={photoUrl}
                      alt={pName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 p-3 text-white">
                      <p className="text-xs font-bold font-serif">{pName}</p>
                      <p className="text-[10px] text-amber-400">{pQual}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Principal's Welcome</p>
                    <h3 className="text-base font-extrabold text-blue-950">{pName}</h3>
                  </div>
                </div>

                {/* Quote & Narrative */}
                <div className="lg:col-span-8 space-y-4">
                  {sec.badgeText && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5 text-blue-800" />
                      <span>{sec.badgeText}</span>
                    </div>
                  )}

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-serif leading-tight">
                    {sec.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {sec.content || settings.principalMessage}
                  </p>

                  {checklist.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {checklist.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.buttonText && (
                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate(sec.buttonUrl || '/pages/principals-desk')}
                        className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 hover:text-amber-600 uppercase tracking-wider transition-colors"
                      >
                        <span>{sec.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'why_us':
        return <WhyUsSection key={sec.id} onNavigate={onNavigate} />;

      case 'programmes':
        return <ProgrammesSection key={sec.id} onNavigate={onNavigate} />;

      case 'admission_cta': {
        return (
          <section
            key={sec.id}
            className={`py-14 relative overflow-hidden ${getThemeClasses(sec.theme || 'gradient')}`}
          >
            {sec.imageUrl && (
              <div className="absolute inset-0 opacity-15">
                <img
                  src={sec.imageUrl}
                  alt="Background"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center lg:text-left">
                {sec.badgeText && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/40">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>{sec.badgeText}</span>
                  </div>
                )}
                <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight leading-tight">
                  {sec.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-200">
                  {sec.subtitle || sec.content}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate(sec.buttonUrl || '/admission')}
                  className="px-7 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  {sec.buttonText || 'Apply Online Now'}
                </button>
                <button
                  onClick={() => onNavigate(sec.secondaryButtonUrl || '/pages/fee-structure')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all"
                >
                  {sec.secondaryButtonText || 'Fee Structure'}
                </button>
              </div>
            </div>
          </section>
        );
      }

      case 'events':
        return <EventsSection key={sec.id} onNavigate={onNavigate} />;

      case 'news':
        return <LatestNewsSection key={sec.id} onNavigate={onNavigate} />;

      case 'facilities':
        return <FacilitiesSection key={sec.id} onNavigate={onNavigate} />;

      case 'gallery':
        return <GallerySection key={sec.id} onNavigate={onNavigate} />;

      case 'map_contact': {
        return (
          <section key={sec.id} className="py-16 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Contact Details Card */}
                <div className="lg:col-span-5 bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    {sec.badgeText && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3">
                        <MapPin className="w-3.5 h-3.5 text-amber-700" />
                        <span>{sec.badgeText}</span>
                      </div>
                    )}
                    <h3 className="text-2xl font-extrabold text-blue-950 font-serif">
                      {sec.title || 'Visit Cauvery Polytechnic'}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {sec.subtitle || sec.content || 'Conveniently situated in Gonikoppal, South Kodagu, accessible via regular bus connectivity from Mysuru, Madikeri, Virajpet, and Kerala borders.'}
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
                      onClick={() => onNavigate(sec.buttonUrl || '/contact')}
                      className="flex-1 py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors text-center"
                    >
                      {sec.buttonText || 'Send Enquiry'}
                    </button>
                    <button
                      onClick={() => onNavigate(sec.secondaryButtonUrl || '/admission')}
                      className="py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors text-center"
                    >
                      {sec.secondaryButtonText || 'Admissions'}
                    </button>
                  </div>
                </div>

                {/* Google Map Container */}
                <div className="lg:col-span-7 h-[360px] lg:h-auto rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-200">
                  <iframe
                    title="Cauvery Polytechnic Location Map"
                    src={sec.customData?.mapEmbed || settings.googleMapEmbed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15604.83856554795!2d75.8872583871582!3d12.138760000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5b5505e60807b%3A0x6b4fb66904d9c733!2sGonikoppal%2C%20Karnataka%20571213!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'}
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
        );
      }

      case 'stats_counter': {
        const statsList = sec.customData?.stats || [
          { number: '30+', label: 'Years of Excellence' },
          { number: '100%', label: 'Placement Assistance' },
          { number: '1500+', label: 'Successful Alumni' },
          { number: '15+', label: 'Modern Laboratories' }
        ];

        return (
          <section key={sec.id} className={`py-14 sm:py-16 ${getThemeClasses(sec.theme || 'dark')}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {sec.title && (
                <div className="text-center max-w-2xl mx-auto mb-10">
                  {sec.badgeText && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-2 border border-amber-500/30">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                      <span>{sec.badgeText}</span>
                    </div>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">{sec.title}</h2>
                  {sec.subtitle && <p className="text-xs sm:text-sm text-slate-300 mt-2">{sec.subtitle}</p>}
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statsList.map((st: any, i: number) => (
                  <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                    <span className="text-3xl sm:text-5xl font-extrabold font-serif text-amber-400 block mb-1">
                      {st.number}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'video_showcase': {
        const videoUrl = sec.customData?.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        return (
          <section key={sec.id} className={`py-16 ${getThemeClasses(sec.theme || 'white')}`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              {sec.badgeText && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-widest">
                  <PlayCircle className="w-3.5 h-3.5 text-blue-800" />
                  <span>{sec.badgeText}</span>
                </div>
              )}
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-blue-950">{sec.title}</h2>
              {sec.subtitle && <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">{sec.subtitle}</p>}

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-video max-w-4xl mx-auto">
                {sec.imageUrl ? (
                  <div className="group relative w-full h-full cursor-pointer" onClick={() => setActiveVideoModal(videoUrl)}>
                    <img src={sec.imageUrl} alt={sec.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-all">
                      <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <PlayCircle className="w-8 h-8 ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    title={sec.title}
                    src={videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </section>
        );
      }

      case 'custom_block':
      default: {
        const checklist = sec.customData?.checklist || [];
        const hasImage = Boolean(sec.imageUrl);

        return (
          <section key={sec.id} className={`py-14 sm:py-18 ${getThemeClasses(sec.theme || 'white')}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 ${hasImage ? 'lg:grid-cols-12 gap-8 lg:gap-12' : 'max-w-3xl mx-auto text-center'} items-center`}>
                {hasImage && (
                  <div className="lg:col-span-5">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-200 bg-slate-100 aspect-4/3">
                      <img
                        src={sec.imageUrl}
                        alt={sec.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )}

                <div className={`${hasImage ? 'lg:col-span-7' : ''} space-y-4`}>
                  {sec.badgeText && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 text-xs font-bold uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5 text-blue-800" />
                      <span>{sec.badgeText}</span>
                    </div>
                  )}

                  <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight leading-tight">
                    {sec.title}
                  </h2>

                  {sec.subtitle && (
                    <p className="text-base sm:text-lg font-medium text-amber-700">
                      {sec.subtitle}
                    </p>
                  )}

                  {sec.content && (
                    <p className="text-sm sm:text-base leading-relaxed opacity-90">
                      {sec.content}
                    </p>
                  )}

                  {checklist.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {checklist.map((pt: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.buttonText && (
                    <div className="pt-3">
                      <button
                        onClick={() => onNavigate(sec.buttonUrl || '/programmes')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all"
                      >
                        <span>{sec.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      }
    }
  };

  return (
    <div className="space-y-0">
      {activeSections.map((section) => renderSection(section))}
    </div>
  );
};
