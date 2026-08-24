import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  Ticket
} from 'lucide-react';

interface EventsSectionProps {
  onNavigate: (url: string) => void;
  showAll?: boolean;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onNavigate, showAll = false }) => {
  const { events } = useCMS();
  const publishedEvents = events
    .filter((e) => e.status === 'published')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const displayedList = showAll ? publishedEvents : publishedEvents.slice(0, 3);

  const formatEventDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return {
        month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
        day: date.getDate(),
        year: date.getFullYear(),
        weekday: date.toLocaleString('default', { weekday: 'short' })
      };
    } catch (e) {
      return { month: 'UPCOMING', day: '2026', year: '', weekday: '' };
    }
  };

  return (
    <section id="events-section" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5 text-blue-800" />
              <span>Campus Happenings</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-serif tracking-tight">
              Upcoming Events & Symposia
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Join technical conferences, sports championships, campus placement drives, and cultural celebrations.
            </p>
          </div>

          {!showAll && (
            <button
              onClick={() => onNavigate('/events')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 self-start md:self-auto"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedList.map((evt) => {
            const { month, day, year, weekday } = formatEventDate(evt.date);

            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col group"
              >
                {/* Image Banner with Date Badge */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-900">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Calendar Pill */}
                  <div className="absolute top-3 left-3 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden text-center min-w-[56px]">
                    <div className="bg-amber-500 text-slate-950 font-bold text-[10px] uppercase py-0.5 px-2">
                      {month}
                    </div>
                    <div className="p-1">
                      <span className="text-xl font-extrabold text-blue-950 block leading-tight font-serif">
                        {day}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase block">
                        {weekday}
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  {evt.category && (
                    <div className="absolute top-3 right-3 bg-blue-950/90 text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs">
                      {evt.category}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-blue-950 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {evt.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onNavigate(evt.registrationUrl || '/contact')}
                      className="w-full py-2 bg-slate-100 hover:bg-amber-500 text-slate-800 hover:text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Register / Details</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
