import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';
import { GalleryLightbox } from './GalleryLightbox';
import { Images, ArrowRight, Eye, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  onNavigate?: (url: string) => void;
  showAll?: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onNavigate, showAll = false }) => {
  const { gallery } = useCMS();
  const activeImages = gallery.filter((g) => g.active).sort((a, b) => a.displayOrder - b.displayOrder);

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(activeImages.map((img) => img.category).filter(Boolean)));
    return ['ALL', ...cats];
  }, [activeImages]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'ALL') {
      return activeImages;
    }
    return activeImages.filter((img) => img.category === selectedCategory);
  }, [activeImages, selectedCategory]);

  const displayedList = showAll ? filteredImages : filteredImages.slice(0, 8);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayedList.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + displayedList.length) % displayedList.length);
    }
  };

  return (
    <section id="gallery-section" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-widest mb-3">
              <Images className="w-3.5 h-3.5 text-blue-800" />
              <span>Campus Life in Pictures</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-serif tracking-tight">
              Photo & Campus Gallery
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Glimpses of academic laboratories, workshops, annual cultural days, athletic sports, and graduation ceremonies.
            </p>
          </div>

          {!showAll && onNavigate && (
            <button
              onClick={() => onNavigate('/gallery')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 self-start md:self-auto"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-blue-950 text-amber-400 shadow-md scale-105'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat === 'ALL' ? 'All Photos' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedList.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden bg-slate-900 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {img.category}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold line-clamp-1 mt-0.5">
                  {img.title}
                </h4>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-300">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click to view</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <GalleryLightbox
        images={displayedList}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </section>
  );
};
