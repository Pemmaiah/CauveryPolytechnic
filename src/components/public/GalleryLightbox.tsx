import React, { useEffect } from 'react';
import { GalleryItem } from '../../types';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface GalleryLightboxProps {
  images: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext
}) => {
  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono font-bold text-amber-400 border border-white/10">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="text-xs uppercase font-bold tracking-wider text-slate-300 hidden sm:inline">
            {currentImage.category}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-amber-400 transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Area with Prev/Next Controls */}
      <div className="relative flex-1 flex items-center justify-center my-2 max-h-[75vh]">
        {/* Prev Button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-slate-900/70 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/20 backdrop-blur-md transition-all shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Display Image */}
        <div className="max-w-5xl max-h-full flex items-center justify-center p-2">
          <img
            src={currentImage.imageUrl}
            alt={currentImage.title}
            className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-200"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-slate-900/70 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/20 backdrop-blur-md transition-all shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption */}
      <div className="text-center text-white max-w-2xl mx-auto z-10">
        <h4 className="text-base sm:text-lg font-bold text-slate-100 font-serif">
          {currentImage.title}
        </h4>
        {currentImage.description && (
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {currentImage.description}
          </p>
        )}
      </div>
    </div>
  );
};
