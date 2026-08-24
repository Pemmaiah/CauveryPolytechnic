import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Newspaper, Calendar, ArrowRight, User } from 'lucide-react';

interface LatestNewsSectionProps {
  onNavigate: (url: string) => void;
  showAll?: boolean;
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({ onNavigate, showAll = false }) => {
  const { news } = useCMS();
  const publishedNews = news
    .filter((n) => n.status === 'published')
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  const displayedList = showAll ? publishedNews : publishedNews.slice(0, 3);

  return (
    <section id="news-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3">
              <Newspaper className="w-3.5 h-3.5 text-amber-700" />
              <span>Campus News & Media</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-serif tracking-tight">
              Latest News & Announcements
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Stay updated with academic circulars, admission notices, placement achievements, and campus developments.
            </p>
          </div>

          {!showAll && (
            <button
              onClick={() => onNavigate('/news')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 self-start md:self-auto"
            >
              <span>View All News</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedList.map((item) => (
            <article
              key={item.id}
              onClick={() => onNavigate(`/news/${item.slug || item.id}`)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-900/30 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {item.author}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-blue-950 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-amber-600 transition-colors uppercase tracking-wider">
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
