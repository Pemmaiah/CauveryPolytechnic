import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { EventsSection } from '../../components/public/EventsSection';
import { Calendar, MapPin, Clock, Ticket, Search } from 'lucide-react';

interface EventsViewProps {
  onNavigate: (url: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-blue-950 text-white py-14 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/30">
            <Calendar className="w-3.5 h-3.5" />
            <span>Campus Activities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            Events, Symposia & Campus Seminars
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Discover upcoming state-level technical symposiums, hackathons, sports tournaments, campus recruitment drives, and academic conferences.
          </p>
        </div>
      </div>

      <EventsSection onNavigate={onNavigate} showAll={true} />
    </div>
  );
};
