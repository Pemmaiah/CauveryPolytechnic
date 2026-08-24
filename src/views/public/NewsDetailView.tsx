import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Newspaper, Calendar, User, ArrowLeft, ArrowRight, Share2, Tag } from 'lucide-react';

interface NewsDetailViewProps {
  slug: string;
  onNavigate: (url: string) => void;
}

export const NewsDetailView: React.FC<NewsDetailViewProps> = ({ slug, onNavigate }) => {
  const { news } = useCMS();
  const article = news.find((n) => n.slug === slug || n.id === slug);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested news article may have been moved or removed.</p>
        <button
          onClick={() => onNavigate('/news')}
          className="mt-4 px-4 py-2 bg-blue-950 text-white text-xs font-bold uppercase rounded-lg"
        >
          Back to News
        </button>
      </div>
    );
  }

  const relatedNews = news
    .filter((n) => n.id !== article.id && n.status === 'published')
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <button
          onClick={() => onNavigate('/news')}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-950 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News Archive</span>
        </button>

        {/* Article Box */}
        <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold uppercase tracking-wider rounded-md">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {article.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {article.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-serif leading-tight">
            {article.title}
          </h1>

          {article.featuredImage && (
            <div className="my-8 rounded-xl overflow-hidden shadow-md max-h-[440px] w-full bg-slate-900">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Article Excerpt Highlight */}
          <div className="p-4 bg-slate-50 border-l-4 border-amber-500 rounded-r-xl text-slate-700 font-medium text-sm sm:text-base mb-6 leading-relaxed">
            {article.shortDescription}
          </div>

          {/* Full Content */}
          <div
            className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-blue-950 prose-a:text-blue-700 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: article.fullContent || article.shortDescription }}
          />
        </article>

        {/* Related News Section */}
        {relatedNews.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-blue-950 font-serif mb-6">More Campus Announcements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate(`/news/${item.slug || item.id}`)}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-amber-500 shadow-xs cursor-pointer group transition-all"
                >
                  <span className="text-[10px] font-bold text-amber-600 uppercase block mb-1">
                    {item.category} • {item.publishedDate}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-900 line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
