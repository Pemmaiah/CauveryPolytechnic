import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LatestNewsBarProps {
  onNavigate?: (url: string) => void;
}

export const LatestNewsBar: React.FC<LatestNewsBarProps> = ({ onNavigate }) => {
  const { news } = useCMS();

  const publishedNews = news
    .filter((n) => n.status === 'published')
    .sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0));

  if (publishedNews.length === 0) return null;

  return (
    <div className="bg-blue-950 text-white border-b border-blue-900/60 text-xs relative z-20">
      <div className="max-w-7xl mx-auto flex items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 bg-blue-900 text-amber-400 font-bold px-3 py-1.5 rounded-l-md uppercase tracking-wider text-[11px] shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>LATEST UPDATES</span>
        </div>

        <div className="flex-1 overflow-hidden py-1.5 px-3">
          <div className="inline-block animate-marquee-slow hover:[animation-play-state:paused] whitespace-nowrap cursor-pointer">
            {publishedNews.map((item) => (
              <span
                key={item.id}
                onClick={() => onNavigate && onNavigate(`/news/${item.slug || item.id}`)}
                className="inline-flex items-center gap-2 mx-6 text-slate-200 hover:text-amber-300 transition-colors"
              >
                <span className="font-semibold text-white">{item.title}</span>
                <span className="text-xs text-blue-300">({item.category})</span>
                <ArrowRight className="w-3 h-3 text-amber-400" />
                <span className="text-blue-700 ml-4 font-bold">|</span>
              </span>
            ))}
          </div>

          <div className="inline-block animate-marquee-slow hover:[animation-play-state:paused] whitespace-nowrap cursor-pointer" aria-hidden="true">
            {publishedNews.map((item) => (
              <span
                key={`repeat-${item.id}`}
                onClick={() => onNavigate && onNavigate(`/news/${item.slug || item.id}`)}
                className="inline-flex items-center gap-2 mx-6 text-slate-200 hover:text-amber-300 transition-colors"
              >
                <span className="font-semibold text-white">{item.title}</span>
                <span className="text-xs text-blue-300">({item.category})</span>
                <ArrowRight className="w-3 h-3 text-amber-400" />
                <span className="text-blue-700 ml-4 font-bold">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
