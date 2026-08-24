import React from 'react';
import { PageItem } from '../../types';
import { useCMS } from '../../context/CMSContext';
import { 
  Calendar, 
  Newspaper, 
  Download, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  GraduationCap,
  FileText
} from 'lucide-react';

interface PageRendererProps {
  page: PageItem;
  onNavigate: (url: string) => void;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ page, onNavigate }) => {
  const { news, events, aicte, settings } = useCMS();

  const latestNews = news.filter((n) => n.status === 'published').slice(0, 3);
  const upcomingEvents = events.filter((e) => e.status === 'published').slice(0, 2);
  const quickDownloads = aicte.filter((a) => a.active).slice(0, 3);

  const hasSidebar = page.layout === 'sidebar';

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      {/* Page Hero Header */}
      <div className="bg-blue-950 text-white py-12 px-4 sm:px-6 lg:px-8 mb-8 border-b border-blue-900 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
            <span onClick={() => onNavigate('/')} className="cursor-pointer hover:underline">Home</span>
            <span>/</span>
            <span>Pages</span>
            <span>/</span>
            <span className="text-slate-300">{page.title}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
            {page.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${hasSidebar ? 'lg:grid-cols-3 gap-10' : 'max-w-4xl mx-auto'}`}>
          {/* Main Content Body */}
          <div className={`bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-xs ${hasSidebar ? 'lg:col-span-2' : ''}`}>
            {page.featuredImage && (
              <div className="mb-8 rounded-xl overflow-hidden max-h-96 w-full shadow-md">
                <img
                  src={page.featuredImage}
                  alt={page.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Render HTML content safely */}
            <div
              className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-blue-950 prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-700 prose-a:font-semibold prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>

          {/* CMS-Controlled Sidebar */}
          {hasSidebar && (
            <aside className="space-y-6">
              {/* Online Admission CTA Card */}
              <div className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-blue-900">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif text-white">Admissions Open 2026-27</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Join premier 3-Year Diploma engineering programmes in Kodagu with scholarship benefits.
                </p>
                <button
                  onClick={() => onNavigate('/admission')}
                  className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
                >
                  Apply Online Now
                </button>
              </div>

              {/* Latest News Widget */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 text-blue-950 font-bold text-sm uppercase tracking-wider font-serif">
                  <Newspaper className="w-4 h-4 text-amber-600" />
                  <span>Latest News</span>
                </div>
                <div className="space-y-3">
                  {latestNews.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onNavigate(`/news/${item.slug || item.id}`)}
                      className="group cursor-pointer border-b border-slate-100 last:border-0 pb-3 last:pb-0"
                    >
                      <span className="text-[10px] font-bold text-amber-600 uppercase block">
                        {item.publishedDate}
                      </span>
                      <h4 className="text-xs font-semibold text-slate-800 group-hover:text-blue-900 line-clamp-2 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events Widget */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 text-blue-950 font-bold text-sm uppercase tracking-wider font-serif">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>Upcoming Events</span>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => onNavigate('/events')}
                      className="group cursor-pointer border-b border-slate-100 last:border-0 pb-3 last:pb-0"
                    >
                      <span className="text-[10px] font-bold text-blue-800 uppercase block">
                        {evt.date} • {evt.time}
                      </span>
                      <h4 className="text-xs font-semibold text-slate-800 group-hover:text-blue-900 line-clamp-2 transition-colors">
                        {evt.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Downloads Widget */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 text-blue-950 font-bold text-sm uppercase tracking-wider font-serif">
                  <Download className="w-4 h-4 text-amber-600" />
                  <span>Important Downloads</span>
                </div>
                <div className="space-y-2.5">
                  {quickDownloads.map((docItem) => (
                    <a
                      key={docItem.id}
                      href={docItem.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200/60 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{docItem.title}</span>
                      </div>
                      <Download className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contact Widget */}
              <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 text-xs space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Campus Helpdesk</h4>
                <p className="text-slate-600">Phone: {settings.phone}</p>
                <p className="text-slate-600">Email: {settings.email}</p>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="pt-2 text-blue-900 hover:underline font-bold flex items-center gap-1"
                >
                  <span>Contact College Office</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};
