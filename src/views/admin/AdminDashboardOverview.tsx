import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Sliders, 
  Menu as MenuIcon, 
  FileText, 
  GraduationCap, 
  Newspaper, 
  Calendar, 
  Images, 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  MessageSquare, 
  ArrowRight, 
  PlusCircle, 
  Sparkles,
  TrendingUp,
  KeyRound
} from 'lucide-react';

interface AdminDashboardOverviewProps {
  onSelectTab: (tab: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({ onSelectTab }) => {
  const { 
    sliders, 
    menus, 
    pages, 
    programmes, 
    news, 
    events, 
    gallery, 
    facilities, 
    aicte, 
    admissions, 
    enquiries 
  } = useCMS();

  const pendingAdmissions = admissions.filter((a) => a.status === 'pending');
  const unreadEnquiries = enquiries.filter((e) => e.status === 'unread');

  const stats = [
    { title: 'Hero Sliders', count: sliders.length, icon: Sliders, tab: 'sliders', color: 'text-blue-600 bg-blue-50' },
    { title: 'Navigation Menus', count: menus.length, icon: MenuIcon, tab: 'menus', color: 'text-indigo-600 bg-indigo-50' },
    { title: 'CMS Pages', count: pages.length, icon: FileText, tab: 'pages', color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Diploma Courses', count: programmes.length, icon: GraduationCap, tab: 'programmes', color: 'text-amber-600 bg-amber-50' },
    { title: 'News Circulars', count: news.length, icon: Newspaper, tab: 'news', color: 'text-sky-600 bg-sky-50' },
    { title: 'Upcoming Events', count: events.length, icon: Calendar, tab: 'events', color: 'text-purple-600 bg-purple-50' },
    { title: 'Gallery Photos', count: gallery.length, icon: Images, tab: 'gallery', color: 'text-rose-600 bg-rose-50' },
    { title: 'AICTE Documents', count: aicte.length, icon: ShieldCheck, tab: 'aicte', color: 'text-teal-600 bg-teal-50' },
    { 
      title: 'Online Admissions', 
      count: admissions.length, 
      sub: `${pendingAdmissions.length} pending review`, 
      icon: UserCheck, 
      tab: 'admissions', 
      color: 'text-amber-700 bg-amber-100' 
    },
    { 
      title: 'Contact Inquiries', 
      count: enquiries.length, 
      sub: `${unreadEnquiries.length} unread`, 
      icon: MessageSquare, 
      tab: 'enquiries', 
      color: 'text-blue-700 bg-blue-100' 
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-time CMS Engine Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
            Institutional Content Management Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Welcome, Administrator. All updates made here reflect instantly on the public website without needing manual rebuilds.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onSelectTab('settings')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md border border-slate-700 flex items-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>Change Password</span>
          </button>
          <button
            onClick={() => onSelectTab('sliders')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
          >
            Manage Hero Sliders
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectTab(stat.tab)}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-900/30 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="mt-3">
                <span className="text-2xl font-extrabold text-slate-900 font-serif block">
                  {stat.count}
                </span>
                <span className="text-xs font-semibold text-slate-600 block mt-0.5">
                  {stat.title}
                </span>
                {stat.sub && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded inline-block mt-1">
                    {stat.sub}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity: Admissions & Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider font-serif">
                  Recent Admission Applications
                </h3>
              </div>
              <button
                onClick={() => onSelectTab('admissions')}
                className="text-xs text-blue-900 hover:underline font-bold"
              >
                View All ({admissions.length})
              </button>
            </div>

            {admissions.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No admission applications received yet.</p>
            ) : (
              <div className="space-y-3">
                {admissions.slice(0, 4).map((app) => (
                  <div
                    key={app.id}
                    onClick={() => onSelectTab('admissions')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 transition-colors cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded mr-2">
                        {app.applicationNumber}
                      </span>
                      <span className="font-bold text-slate-800">{app.fullName}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {app.coursePreference1} • SSLC: {app.sslcPercentage}%
                      </p>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        app.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : app.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider font-serif">
                  Recent Contact Inquiries
                </h3>
              </div>
              <button
                onClick={() => onSelectTab('enquiries')}
                className="text-xs text-blue-900 hover:underline font-bold"
              >
                View All ({enquiries.length})
              </button>
            </div>

            {enquiries.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No contact inquiries received yet.</p>
            ) : (
              <div className="space-y-3">
                {enquiries.slice(0, 4).map((enq) => (
                  <div
                    key={enq.id}
                    onClick={() => onSelectTab('enquiries')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 transition-colors cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800">{enq.name}</span>
                      <span className="text-[11px] text-slate-500 ml-2">({enq.phone})</span>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                        {enq.subject}: {enq.message}
                      </p>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        enq.status === 'unread'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
