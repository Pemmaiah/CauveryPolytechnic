import React, { useState, useEffect, useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SliderItem } from '../../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ArrowRight, 
  GraduationCap, 
  FileText 
} from 'lucide-react';

interface CinematicHeroSliderProps {
  onNavigate: (url: string) => void;
}

export const CinematicHeroSlider: React.FC<CinematicHeroSliderProps> = ({ onNavigate }) => {
  const { sliders } = useCMS();
  const activeSlides = sliders.filter((s) => s.active).sort((a, b) => a.displayOrder - b.displayOrder);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [keyTrigger, setKeyTrigger] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide: SliderItem | undefined = activeSlides[currentIndex] || activeSlides[0];

  const slideDurationMs = (currentSlide?.slideDuration || 7) * 1000;

  // Auto-advancement timer
  useEffect(() => {
    if (activeSlides.length <= 1 || !isPlaying || isHovered) return;

    timerRef.current = setTimeout(() => {
      handleNext();
    }, slideDurationMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPlaying, isHovered, activeSlides.length, slideDurationMs, keyTrigger]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
    setKeyTrigger((k) => k + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1));
    setKeyTrigger((k) => k + 1);
  };

  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx);
    setKeyTrigger((k) => k + 1);
  };

  if (!currentSlide || activeSlides.length === 0) return null;

  // Map animation classes based on slide.animationType
  const getAnimationClass = (type: SliderItem['animationType']) => {
    switch (type) {
      case 'kenburns':
        return 'animate-ken-burns';
      case 'zoom-in':
        return 'animate-zoom-in';
      case 'zoom-out':
        return 'animate-zoom-out';
      case 'pan-left':
        return 'animate-pan-left';
      case 'pan-right':
        return 'animate-pan-right';
      case 'pan-up':
        return 'animate-pan-up';
      case 'pan-down':
        return 'animate-pan-down';
      case 'cinematic-scale':
        return 'animate-cinematic-scale';
      case 'fade':
      default:
        return 'animate-subtle-drift';
    }
  };

  const textAlignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  }[currentSlide.textPosition || 'left'];

  const overlayOpacity = currentSlide.overlayOpacity ?? 0.6;

  return (
    <section
      id="hero-slider-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] overflow-hidden bg-slate-950 select-none group"
    >
      {/* Background Visual (Image or Video) */}
      <div key={`slide-bg-${currentSlide.id}-${keyTrigger}`} className="absolute inset-0 w-full h-full overflow-hidden">
        {currentSlide.mediaType === 'video' && currentSlide.videoUrl ? (
          <video
            src={currentSlide.videoUrl}
            poster={currentSlide.posterUrl || currentSlide.imageUrl}
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover ${getAnimationClass(currentSlide.animationType)}`}
            style={{ animationDuration: `${currentSlide.animationDuration || 14}s` }}
          />
        ) : (
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            className={`w-full h-full object-cover ${getAnimationClass(currentSlide.animationType)}`}
            style={{ animationDuration: `${currentSlide.animationDuration || 14}s` }}
            referrerPolicy="no-referrer"
          />
        )}

        {/* Dynamic Multi-Layer Cinematic Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-radial-vignette opacity-50" />
      </div>

      {/* Content Container with Sequenced Text Motion */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div key={`slide-content-${currentSlide.id}-${keyTrigger}`} className={`max-w-3xl flex flex-col ${textAlignmentClass}`}>
          {/* Subtitle Badge */}
          {currentSlide.subtitle && (
            <div className="animate-slide-up-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest backdrop-blur-md mb-3 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{currentSlide.subtitle}</span>
            </div>
          )}

          {/* Main Title */}
          <h2 className="animate-slide-up-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-serif tracking-tight drop-shadow-md">
            {currentSlide.title}
          </h2>

          {/* Description */}
          {currentSlide.description && (
            <p className="animate-slide-up-3 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl font-light drop-shadow">
              {currentSlide.description}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="animate-slide-up-4 mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {currentSlide.buttonText && (
              <button
                type="button"
                onClick={() => onNavigate(currentSlide.buttonUrl || '/admission')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-amber-500/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>{currentSlide.buttonText}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            )}

            {currentSlide.secondaryButtonText && (
              <button
                type="button"
                onClick={() => onNavigate(currentSlide.secondaryButtonUrl || '/programmes')}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>{currentSlide.secondaryButtonText}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls (Prev / Next Buttons) */}
      {activeSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/60 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xl focus:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/60 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xl focus:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Bottom Bar: Slide Progress, Dots & Play/Pause */}
      <div className="absolute bottom-4 left-0 right-0 z-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Thumb Dots */}
          <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            {activeSlides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`relative h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-amber-400 shadow-sm'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="ml-2 text-slate-300 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          </div>

          {/* Quick Counter */}
          <div className="text-xs font-mono font-semibold text-slate-300 bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 hidden sm:block">
            <span className="text-amber-400">0{currentIndex + 1}</span> / 0{activeSlides.length}
          </div>
        </div>
      </div>
    </section>
  );
};
