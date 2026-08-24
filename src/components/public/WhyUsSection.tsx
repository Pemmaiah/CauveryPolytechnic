import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Award, 
  Briefcase, 
  Cpu, 
  GraduationCap, 
  Trees, 
  BadgeIndianRupee, 
  CheckCircle2,
  Sparkles,
  BookOpen,
  Wrench,
  Users,
  Compass
} from 'lucide-react';

interface WhyUsSectionProps {
  onNavigate?: (url: string) => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onNavigate }) => {
  const { whyUs, settings } = useCMS();
  const activeItems = whyUs.filter((w) => w.active).sort((a, b) => a.displayOrder - b.displayOrder);

  // Icon resolver
  const getIcon = (name: string) => {
    const iconClass = "w-6 h-6 text-amber-500";
    switch (name.toLowerCase()) {
      case 'award':
        return <Award className={iconClass} />;
      case 'briefcase':
        return <Briefcase className={iconClass} />;
      case 'cpu':
        return <Cpu className={iconClass} />;
      case 'graduationcap':
        return <GraduationCap className={iconClass} />;
      case 'trees':
        return <Trees className={iconClass} />;
      case 'badgeindianrupee':
        return <BadgeIndianRupee className={iconClass} />;
      case 'wrench':
        return <Wrench className={iconClass} />;
      case 'users':
        return <Users className={iconClass} />;
      case 'bookopen':
        return <BookOpen className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="why-us-section" className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-800" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-serif tracking-tight">
            Why Choose Cauvery Polytechnic?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Combining academic rigor, practical industry skills, modern laboratories, and dedicated placement support in the peaceful green heart of South Kodagu.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                {getIcon(item.iconName)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-950 transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 rounded-2xl p-8 text-white shadow-xl border border-blue-900/60">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">{settings.stats.yearsOfExcellence || '25+'}</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium uppercase tracking-wider mt-1">Years of Academic Legacy</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">{settings.stats.students || '1,200+'}</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium uppercase tracking-wider mt-1">Active Students</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">{settings.stats.placementPercent || '95%'}</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium uppercase tracking-wider mt-1">Placement Success Rate</p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">{settings.stats.labsCount || '22+'}</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium uppercase tracking-wider mt-1">Specialized Labs & Shops</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
