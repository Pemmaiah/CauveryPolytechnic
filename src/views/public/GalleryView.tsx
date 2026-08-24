import React from 'react';
import { GallerySection } from '../../components/public/GallerySection';
import { Images } from 'lucide-react';

interface GalleryViewProps {
  onNavigate: (url: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Banner */}
      <div className="bg-blue-950 text-white py-14 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/30">
            <Images className="w-3.5 h-3.5" />
            <span>Campus Media</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            Photo & Campus Life Gallery
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Explore state-of-the-art engineering workshops, computing centers, athletic tournaments, Kodava cultural celebrations, and convocation moments.
          </p>
        </div>
      </div>

      <GallerySection showAll={true} onNavigate={onNavigate} />
    </div>
  );
};
