import React, { useState, useEffect, useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import { TickerItem } from '../../types';
import { 
  Zap, 
  Megaphone, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ExternalLink, 
  ArrowRight, 
  Flame, 
  BellRing,
  Volume2
} from 'lucide-react';

interface FlashNewsTickerProps {
  onNavigate?: (url: string) => void;
  variant?: 'floating-above-slider' | 'standalone' | 'compact';
}

export const FlashNewsTicker: React.FC<FlashNewsTickerProps> = ({ 
  onNavigate,
  variant = 'floating-above-slider'
}) => {
  const { ticker, news } = useCMS();
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'marquee' | 'slide'>('marquee');
  const [isFlashing, setIsFlashing] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Active tickers from CMS ticker collection
  const activeTickers: TickerItem[] = ticker
    .filter((t) => t.active)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Also include published high-priority / ticker news if available
  const activeNewsTickers: TickerItem[] = news
    .filter((n) => n.status === 'published' && (n.isTickerItem || n.priority))
    .slice(0, 4)
    .map((n, idx) => ({
      id: `news-ticker-${n.id}`,
      text: n.title,
      link: `/news/${n.slug || n.id}`,
      active: true,
      order: 10 + idx,
      badge: n.category ? n.category.toUpperCase() : 'NEWS',
      isFlash: Boolean(n.priority)
    }));

  // Combined ticker list
  const combinedItems: TickerItem[] = activeTickers.length > 0 
    ? activeTickers 
    : (activeNewsTickers.length > 0 ? activeNewsTickers : [
        {
          id: 'default-1',
          text: 'Admissions Open for 2026-27 | 3-Year Diploma in CSE, Mechanical, Civil, E&C & Automobile Engineering',
          link: '/admission',
          active: true,
          order: 1,
          badge: 'ADMISSION 2026',
          isFlash: true
        },
        {
          id: 'default-2',
          text: 'AICTE Approved & DTE Karnataka Affiliated (Code: 494) - Special Merit Fee Concessions Available',
          link: '/pages/fee-structure',
          active: true,
          order: 2,
          badge: 'AFFILIATION',
          isFlash: false
        }
      ]);

  // Slide auto-rotation if in slide mode
  useEffect(() => {
    if (viewMode !== 'slide' || isPaused || combinedItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % combinedItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [viewMode, isPaused, combinedItems.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? combinedItems.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % combinedItems.length);
  };

  const handleItemClick = (item: TickerItem) => {
    if (item.link && onNavigate) {
      onNavigate(item.link);
    }
  };

  const currentSlideItem = combinedItems[currentIndex] || combinedItems[0];

  const getBadgeColor = (badge?: string) => {
    const b = (badge || '').toUpperCase();
    if (b.includes('ADMISSION')) return 'bg-amber-400 text-slate-950 font-black border-amber-300';
    if (b.includes('EVENT') || b.includes('EXAM')) return 'bg-rose-500 text-white font-bold border-rose-400';
    if (b.includes('SCHOLARSHIP') || b.includes('FEE')) return 'bg-emerald-500 text-white font-bold border-emerald-400';
    if (b.includes('PLACEMENT')) return 'bg-indigo-500 text-white font-bold border-indigo-400';
    if (b.includes('AICTE') || b.includes('CIRCULAR')) return 'bg-sky-500 text-white font-bold border-sky-400';
    return 'bg-amber-500 text-slate-950 font-extrabold border-amber-400';
  };

  return (
    <div 
      id="flash-news-ticker"
      className="w-full bg-linear-to-r from-slate-950 via-blue-950 to-slate-950 text-white border-y border-amber-500/40 shadow-lg relative z-30 overflow-hidden"
    >
      {/* Background Accent Grid / Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-4 lg:px-6 relative">
        
        {/* Left: Animated Flash News Badge */}
        <div className="flex items-center shrink-0 z-20 my-1 sm:my-1.5">
          <div className="relative group flex items-center">
            {/* Pulsing Flash Badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-linear-to-r from-rose-600 via-red-600 to-amber-600 text-white shadow-md font-black text-[11px] sm:text-xs uppercase tracking-wider select-none border border-rose-400/40">
              
              {/* Animated Live Ping Indicator */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400 shadow-xs" />
              </span>

              <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-bounce" />
              
              <span className="tracking-widest font-extrabold drop-shadow-xs font-mono">
                FLASH NEWS
              </span>
            </div>

            {/* Triangular decorative notch (desktop only) */}
            <div className="hidden sm:block w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-amber-600 ml-0.5" />
          </div>
        </div>

        {/* Center: Live Scroller / Marquee Content */}
        <div 
          className="flex-1 overflow-hidden px-2 sm:px-4 py-1.5 relative select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {viewMode === 'marquee' ? (
            /* Continuous Smooth Marquee Track */
            <div className="flex items-center overflow-hidden whitespace-nowrap mask-gradient">
              <div 
                ref={scrollerRef}
                className={`inline-flex items-center gap-8 ${
                  isPaused ? '[animation-play-state:paused]' : ''
                } animate-marquee cursor-pointer py-0.5`}
              >
                {combinedItems.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => handleItemClick(item)}
                    className="inline-flex items-center gap-2.5 text-slate-100 hover:text-amber-300 transition-colors group cursor-pointer"
                  >
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border shadow-xs transition-transform group-hover:scale-105 ${getBadgeColor(item.badge)}`}>
                        {item.badge}
                      </span>
                    )}

                    <span className="text-xs sm:text-[13px] font-medium tracking-wide text-slate-100 group-hover:text-amber-300 group-hover:underline">
                      {item.text}
                    </span>

                    {item.link && (
                      <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-1 transition-transform opacity-75 group-hover:opacity-100" />
                    )}

                    <span className="text-amber-400/50 text-xs mx-3">★</span>
                  </div>
                ))}
              </div>

              {/* Duplicate track for seamless infinite marquee loop */}
              <div 
                aria-hidden="true"
                className={`inline-flex items-center gap-8 ${
                  isPaused ? '[animation-play-state:paused]' : ''
                } animate-marquee cursor-pointer py-0.5`}
              >
                {combinedItems.map((item, idx) => (
                  <div
                    key={`repeat-${item.id}-${idx}`}
                    onClick={() => handleItemClick(item)}
                    className="inline-flex items-center gap-2.5 text-slate-100 hover:text-amber-300 transition-colors group cursor-pointer"
                  >
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border shadow-xs transition-transform group-hover:scale-105 ${getBadgeColor(item.badge)}`}>
                        {item.badge}
                      </span>
                    )}

                    <span className="text-xs sm:text-[13px] font-medium tracking-wide text-slate-100 group-hover:text-amber-300 group-hover:underline">
                      {item.text}
                    </span>

                    {item.link && (
                      <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-1 transition-transform opacity-75 group-hover:opacity-100" />
                    )}

                    <span className="text-amber-400/50 text-xs mx-3">★</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Slide Mode (One item at a time with smooth transition) */
            <div 
              onClick={() => handleItemClick(currentSlideItem)}
              className="flex items-center gap-2.5 text-xs sm:text-[13px] cursor-pointer group transition-all py-0.5 truncate"
            >
              {currentSlideItem.badge && (
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border shrink-0 ${getBadgeColor(currentSlideItem.badge)}`}>
                  {currentSlideItem.badge}
                </span>
              )}
              <span className="text-slate-100 group-hover:text-amber-300 truncate font-medium">
                {currentSlideItem.text}
              </span>
              <ArrowRight className="w-3 h-3 text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>

        {/* Right: Controls & View All Link */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 z-20 pl-2">
          
          {/* Pause / Play Toggle */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors hidden sm:inline-flex"
            title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Previous / Next buttons */}
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-md overflow-hidden">
            <button
              onClick={handlePrev}
              className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Previous notification"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border-l border-slate-700/80"
              title="Next notification"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick "All News" Link */}
          {onNavigate && (
            <button
              onClick={() => onNavigate('/news')}
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-900 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-blue-700/50 transition-colors shrink-0"
            >
              <span>All Notices</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
