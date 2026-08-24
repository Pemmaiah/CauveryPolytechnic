import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  GraduationCap, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ProgrammesSectionProps {
  onNavigate: (url: string) => void;
  showAll?: boolean;
}

export const ProgrammesSection: React.FC<ProgrammesSectionProps> = ({ onNavigate, showAll = false }) => {
  const { programmes } = useCMS();
  const activeProgrammes = programmes
    .filter((p) => p.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const displayedList = showAll ? activeProgrammes : activeProgrammes.slice(0, 6);

  return (
    <section id="programmes-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
              <span>Academic Programmes</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-serif tracking-tight">
              Diploma Engineering Courses
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              AICTE-approved 3-year diploma engineering programs designed to prepare students with hands-on technical skills and immediate employability.
            </p>
          </div>

          {!showAll && (
            <button
              onClick={() => onNavigate('/programmes')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 self-start md:self-auto"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Programmes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedList.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-900/30 transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                <img
                  src={prog.image}
                  alt={prog.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Code Pill */}
                <div className="absolute top-3 left-3 bg-blue-950/90 backdrop-blur-md text-amber-400 text-xs font-mono font-bold px-2.5 py-1 rounded-md border border-white/20">
                  {prog.code}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <span className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded backdrop-blur-xs">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {prog.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded backdrop-blur-xs">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    Intake: {prog.intake} Seats
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-950 group-hover:text-blue-700 transition-colors font-serif leading-snug">
                    {prog.name}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {prog.highlights && prog.highlights.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Highlights:</p>
                      {prog.highlights.slice(0, 2).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('/admission')}
                    className="flex-1 py-2.5 px-3 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center"
                  >
                    Apply for Seat
                  </button>
                  <button
                    onClick={() => onNavigate(`/programmes#${prog.id}`)}
                    className="p-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-blue-950 rounded-xl transition-colors"
                    title="Course Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
