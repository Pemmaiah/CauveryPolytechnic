import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Building2, Laptop, Wrench, BookOpen, Presentation, Trophy, Bus, CheckCircle2 } from 'lucide-react';

interface FacilitiesViewProps {
  onNavigate: (url: string) => void;
}

export const FacilitiesView: React.FC<FacilitiesViewProps> = ({ onNavigate }) => {
  const { facilities } = useCMS();
  const activeFacilities = facilities.filter((f) => f.active).sort((a, b) => a.displayOrder - b.displayOrder);

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'laptop':
        return <Laptop className="w-6 h-6" />;
      case 'wrench':
        return <Wrench className="w-6 h-6" />;
      case 'bookopen':
        return <BookOpen className="w-6 h-6" />;
      case 'presentation':
        return <Presentation className="w-6 h-6" />;
      case 'trophy':
        return <Trophy className="w-6 h-6" />;
      case 'bus':
        return <Bus className="w-6 h-6" />;
      default:
        return <Building2 className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Banner */}
      <div className="bg-blue-950 text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>Infrastructure & Laboratories</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            Campus Infrastructure & Facilities
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            State-of-the-art laboratories, industrial workshops, smart lecture rooms, and digital libraries spread across acres of serene green campus in Gonikoppal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {activeFacilities.map((fac, idx) => (
          <div
            key={fac.id}
            className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Facility Images Showcase */}
            <div className={`lg:col-span-6 space-y-3 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="h-64 sm:h-72 rounded-xl overflow-hidden shadow-md bg-slate-900">
                <img
                  src={fac.images[0] || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'}
                  alt={fac.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {fac.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {fac.images.slice(1, 4).map((img, imgIdx) => (
                    <div key={imgIdx} className="h-20 rounded-lg overflow-hidden border border-slate-200">
                      <img src={img} alt={`${fac.title} ${imgIdx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description & Features */}
            <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-950 text-amber-400">
                  {getIcon(fac.icon)}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">{fac.category}</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-serif">{fac.title}</h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {fac.fullDesc || fac.shortDesc}
              </p>

              {fac.features && fac.features.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Amenities:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {fac.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
