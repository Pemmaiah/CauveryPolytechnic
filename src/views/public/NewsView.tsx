import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Newspaper, Calendar, User, ArrowRight, Search } from 'lucide-react';

interface NewsViewProps {
  onNavigate: (url: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onNavigate }) => {
  const { news } = useCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const publishedNews = news
    .filter((n) => n.status === 'published')
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  const categories = useMemo(() => {
    const cats = Array.from(new Set(publishedNews.map((n) => n.category).filter(Boolean)));
    return ['ALL', ...cats];
  }, [publishedNews]);

  const filteredNews = useMemo(() => {
    return publishedNews.filter((item) => {
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [publishedNews, selectedCategory, searchTerm]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Banner */}
      <div className="bg-blue-950 text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/30">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Official Announcements</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            News & Press Releases
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Latest circulars, admission bulletins, placement results, academic examinations, and achievements from Cauvery Polytechnic Gonikoppal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-950 text-amber-400 shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat === 'ALL' ? 'All News' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search news..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
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
    </div>
  );
};
