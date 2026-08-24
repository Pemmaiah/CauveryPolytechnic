import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { PageRenderer } from '../../components/public/PageRenderer';

interface DynamicPageViewProps {
  slug: string;
  onNavigate: (url: string) => void;
}

export const DynamicPageView: React.FC<DynamicPageViewProps> = ({ slug, onNavigate }) => {
  const { pages } = useCMS();
  
  // Find page by slug or id
  const targetPage = pages.find((p) => (p.slug === slug || p.id === slug) && p.status === 'published');

  if (!targetPage) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-slate-50 text-center">
        <h2 className="text-2xl font-bold text-slate-800 font-serif">Page Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The page you requested does not exist or has been unpublished.</p>
        <button
          onClick={() => onNavigate('/')}
          className="mt-5 px-5 py-2.5 bg-blue-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  return <PageRenderer page={targetPage} onNavigate={onNavigate} />;
};
