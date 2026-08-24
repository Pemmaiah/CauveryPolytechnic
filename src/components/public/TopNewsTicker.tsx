import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Megaphone, Bell } from 'lucide-react';

interface TopNewsTickerProps {
  onNavigate?: (url: string) => void;
}

export const TopNewsTicker: React.FC<TopNewsTickerProps> = ({ onNavigate }) => {
  const { ticker } = useCMS();

  const activeTickers = ticker.filter((t) => t.active).sort((a, b) => a.order - b.order);

  if (activeTickers.length === 0) return null;

  return (
    <div className="bg-slate-900 text-slate-100 text-xs border-b border-slate-800 relative z-30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Badge Label */}
        <div className="bg-amber-600 text-slate-950 font-bold px-3 py-1.5 flex items-center gap-1.5 shrink-0 uppercase tracking-wider text-[11px] shadow-sm select-none z-10">
          <Megaphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">ANNOUNCEMENTS</span>
          <span className="sm:hidden">NEWS</span>
        </div>

        {/* Marquee Scroller */}
        <div className="flex-1 overflow-hidden relative py-1.5 whitespace-nowrap">
          <div className="inline-block animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {activeTickers.map((item, idx) => (
              <span
                key={item.id || idx}
                onClick={() => {
                  if (item.link && onNavigate) {
                    onNavigate(item.link);
                  }
                }}
                className="inline-flex items-center gap-2 mx-6 text-slate-200 hover:text-amber-400 transition-colors"
              >
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-blue-900/80 text-amber-300 font-bold text-[10px] uppercase">
                    {item.badge}
                  </span>
                )}
                <span>{item.text}</span>
                <span className="text-amber-500/60 ml-4 font-black">✦</span>
              </span>
            ))}
          </div>

          {/* Repeated items for seamless continuous ticker */}
          <div className="inline-block animate-marquee hover:[animation-play-state:paused] cursor-pointer" aria-hidden="true">
            {activeTickers.map((item, idx) => (
              <span
                key={`repeat-${item.id || idx}`}
                onClick={() => {
                  if (item.link && onNavigate) {
                    onNavigate(item.link);
                  }
                }}
                className="inline-flex items-center gap-2 mx-6 text-slate-200 hover:text-amber-400 transition-colors"
              >
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-blue-900/80 text-amber-300 font-bold text-[10px] uppercase">
                    {item.badge}
                  </span>
                )}
                <span>{item.text}</span>
                <span className="text-amber-500/60 ml-4 font-black">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
