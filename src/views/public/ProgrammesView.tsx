import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  GraduationCap, 
  Clock, 
  Users, 
  CheckCircle2, 
  Briefcase, 
  BookOpen, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProgrammesViewProps {
  onNavigate: (url: string) => void;
}

export const ProgrammesView: React.FC<ProgrammesViewProps> = ({ onNavigate }) => {
  const { programmes } = useCMS();
  const activeProgrammes = programmes.filter((p) => p.active).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Banner */}
      <div className="bg-blue-950 text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>AICTE Approved Diploma Courses</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            Academic Programmes & Disciplines
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Cauvery Polytechnic offers 5 premier 3-Year Diploma Engineering courses approved by AICTE, New Delhi and affiliated to DTE Karnataka, empowering students with hands-on technical proficiencies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {activeProgrammes.map((prog) => (
          <div
            key={prog.id}
            id={prog.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:shadow-md transition-shadow"
          >
            {/* Left Image & Specs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="h-56 sm:h-64 rounded-xl overflow-hidden shadow-inner bg-slate-900">
                <img
                  src={prog.image}
                  alt={prog.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border rounded-xl">
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Duration</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {prog.duration}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border rounded-xl">
                  <span className="text-slate-400 font-bold uppercase block text-[10px]">Approved Intake</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    {prog.intake} Seats/Year
                  </span>
                </div>
              </div>

              {/* HOD Info if available */}
              {prog.hodName && (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs">
                  <p className="font-bold text-blue-950">{prog.hodName}</p>
                  <p className="text-[11px] text-blue-700 font-medium">Head of Department</p>
                  {prog.hodMessage && (
                    <p className="text-slate-600 italic mt-1 text-[11px]">"{prog.hodMessage}"</p>
                  )}
                </div>
              )}
            </div>

            {/* Right Details */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="bg-amber-100 text-amber-900 text-xs font-mono font-bold px-2.5 py-1 rounded">
                  {prog.code}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-serif mt-2">
                  {prog.name}
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              {/* Eligibility */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-900" />
                  <span>Eligibility Criteria</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">{prog.eligibility}</p>
              </div>

              {/* Key Highlights */}
              {prog.highlights && prog.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Key Laboratory & Learning Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {prog.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Opportunities */}
              {prog.careers && prog.careers.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-amber-600" />
                    <span>Career Prospects & Higher Studies</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {prog.careers.map((career, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('/admission')}
                  className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
                >
                  Apply for {prog.name}
                </button>
                <button
                  onClick={() => onNavigate('/pages/fee-structure')}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Fee Structure
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
