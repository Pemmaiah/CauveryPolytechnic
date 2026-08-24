import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Building2, Laptop, Wrench, BookOpen, Presentation, Trophy, Bus, ArrowRight } from 'lucide-react';

interface FacilitiesSectionProps {
  onNavigate: (url: string) => void;
  showAll?: boolean;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onNavigate, showAll = false }) => {
  const { facilities } = useCMS();
  const activeFacilities = facilities.filter((f) => f.active).sort((a, b) => a.displayOrder - b.displayOrder);

  const displayedList = showAll ? activeFacilities : activeFacilities.slice(0, 4);

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'laptop':
        return <Laptop className="w-5 h-5" />;
      case 'wrench':
        return <Wrench className="w-5 h-5" />;
      case 'bookopen':
        return <BookOpen className="w-5 h-5" />;
      case 'presentation':
        return <Presentation className="w-5 h-5" />;
      case 'trophy':
        return <Trophy className="w-5 h-5" />;
      case 'bus':
        return <Bus className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="facilities-section" className="py-16 sm:py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus & Infrastructure</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
              World-Class Learning Facilities
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Modern computing clusters, heavy machine workshops, spacious smart lecture halls, and central digital libraries in Gonikoppal.
            </p>
          </div>

          {!showAll && (
            <button
              onClick={() => onNavigate('/campus-facilities')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all duration-200 self-start md:self-auto"
            >
              <span>Explore All Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedList.map((fac) => (
            <div
              key={fac.id}
              onClick={() => onNavigate('/campus-facilities')}
              className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-hidden hover:border-amber-500/60 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={fac.images[0] || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-3 left-3 p-2 bg-blue-900/90 text-amber-400 rounded-lg shadow backdrop-blur-xs">
                  {getIcon(fac.icon)}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {fac.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {fac.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
