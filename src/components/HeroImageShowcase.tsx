import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, X, ChevronLeft, ChevronRight, Maximize2, CheckCircle2 } from 'lucide-react';

interface ShowcaseImage {
  id: number;
  src: string;
  title: string;
  tag: string;
  desc: string;
}

const showcaseImages: ShowcaseImage[] = [
  {
    id: 1,
    src: '/showcase/slide-1.jpeg',
    title: 'Pod Sprint Architecture Review',
    tag: 'Mentor Review',
    desc: 'Student pod leads in deep architecture review with industry mentors and technical advisor.'
  },
  {
    id: 2,
    src: '/showcase/slide-2.jpeg',
    title: 'Milestone Gate & Viva Defense',
    tag: 'Sprint Stage-Gate',
    desc: 'Formal presentation and stage-gate inspection before faculty and enterprise evaluators.'
  },
  {
    id: 3,
    src: '/showcase/slide-3.jpeg',
    title: 'SME Plant Problem Discovery',
    tag: 'Bhagyashree Polymers',
    desc: 'On-site industrial factory inspection mapping real manufacturing workflow bottlenecks.'
  },
  {
    id: 4,
    src: '/showcase/slide-4.jpeg',
    title: 'Live Development & Code Sprint',
    tag: 'Pod Dev Lab',
    desc: 'Hands-on development lab with synchronized commits, telemetry, and automated unit testing.'
  },
  {
    id: 5,
    src: '/showcase/slide-5.jpeg',
    title: 'SME Stakeholder Collaboration',
    tag: 'Partner SME',
    desc: 'Direct interaction with SME leadership validating software functional requirements.'
  },
  {
    id: 6,
    src: '/showcase/slide-6.jpeg',
    title: 'Verified Student Cohort Pod',
    tag: 'Certified Builders',
    desc: 'Multi-disciplinary student pod engineers prepared for production deployment & IP handover.'
  },
  {
    id: 7,
    src: '/showcase/slide-7.jpeg',
    title: 'Executive Stakeholder Briefing',
    tag: 'Executive Audit',
    desc: 'Formal sign-off and review of deliverables with institution leaders and industry sponsors.'
  }
];

export const HeroImageShowcase: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ShowcaseImage | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Repeat the images 3 times for seamless infinite continuous left-to-right looping
  const repeatedImages = [...showcaseImages, ...showcaseImages, ...showcaseImages];

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = showcaseImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % showcaseImages.length;
    setSelectedImage(showcaseImages[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = showcaseImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + showcaseImages.length) % showcaseImages.length;
    setSelectedImage(showcaseImages[prevIndex]);
  };

  return (
    <div className="w-full relative py-6 md:py-10 overflow-hidden z-20">
      
      {/* Header Pill & Micro-Title */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/40 via-purple-800/30 to-indigo-900/40 border border-purple-500/40 text-purple-200 text-xs font-mono tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(168,127,251,0.2)]">
          <Camera className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>Real-World SME On-Site Discovery & Pod Cohorts</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <p className="text-xs sm:text-sm text-[#b2abc0] max-w-xl mx-auto">
          Actual student pods on-ground at manufacturing plants, live engineering labs, and corporate viva defense panels.
        </p>
      </div>

      {/* Sliding Track Outer Container with Gradient Masking on Edges */}
      <div 
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft edge blur masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#08070d] via-[#08070d]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#08070d] via-[#08070d]/80 to-transparent z-10" />

        {/* Continuous Left-to-Right Animated Sliding Track */}
        <motion.div
          className="flex items-center gap-4 sm:gap-6 py-4 w-max"
          animate={{
            x: isPaused ? undefined : ['-50%', '0%']
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear'
            }
          }}
          style={{ willChange: 'transform' }}
        >
          {repeatedImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              onClick={() => setSelectedImage(image)}
              className="group relative w-64 sm:w-80 md:w-96 shrink-0 rounded-2xl sm:rounded-3xl bg-[#171422]/90 border border-purple-500/30 hover:border-purple-400/80 p-2.5 sm:p-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(168,127,251,0.4)] cursor-pointer backdrop-blur-md overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative w-full h-44 sm:h-52 md:h-60 rounded-xl sm:rounded-2xl overflow-hidden bg-purple-950/40">
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08070d] via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-purple-200 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>{image.tag}</span>
                </div>

                {/* Expand Icon Button */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Title & Micro-Caption */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-md">
                    {image.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5 opacity-90 drop-shadow">
                    {image.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Info Pill Below Slider */}
      <div className="flex justify-center items-center gap-2 mt-4 text-[11px] font-mono text-purple-300/80">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span>Hover to pause &bull; Click any photo to view in full resolution</span>
      </div>

      {/* High-Resolution Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#13101f] border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Lightbox Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#191528]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-mono font-bold">
                    {selectedImage.tag}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {selectedImage.title}
                  </h3>
                </div>
                
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Lightbox Display */}
              <div className="relative flex-1 bg-black/60 flex items-center justify-center overflow-hidden p-2 sm:p-4 min-h-[300px] sm:min-h-[480px]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />

                {/* Previous Image Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-purple-600 border border-white/20 text-white transition-all cursor-pointer shadow-lg hover:scale-110"
                  title="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Image Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-purple-600 border border-white/20 text-white transition-all cursor-pointer shadow-lg hover:scale-110"
                  title="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox Footer Caption */}
              <div className="p-4 sm:p-5 bg-[#191528] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p>{selectedImage.desc}</p>
                </div>
                <div className="font-mono text-xs text-purple-300 shrink-0">
                  Image {selectedImage.id} of {showcaseImages.length}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
