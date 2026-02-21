import { useEffect, useRef, useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useDragControls } from "framer-motion";

export default function ArtworkModal({
  isOpen,
  artworks,
  index,
  onClose,
  onChangeIndex,
}) {
  const closeRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const lastActiveRef = useRef(null);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const dragControls = useDragControls();

  const goToPrev = useCallback(() => {
    if (index > 0) {
      setDirection(-1);
      onChangeIndex(index - 1);
    }
  }, [index, onChangeIndex]);

  const goToNext = useCallback(() => {
    if (index < artworks.length - 1) {
      setDirection(1);
      onChangeIndex(index + 1);
    }
  }, [index, artworks.length, onChangeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    lastActiveRef.current = document.activeElement;
    
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Tab") {
        const focusOrder = [closeRef.current, prevRef.current, nextRef.current];
        const currentIdx = focusOrder.indexOf(document.activeElement);
        if (e.shiftKey) {
          const target = focusOrder[(currentIdx - 1 + focusOrder.length) % focusOrder.length];
          target?.focus();
          e.preventDefault();
        } else {
          const target = focusOrder[(currentIdx + 1) % focusOrder.length];
          target?.focus();
          e.preventDefault();
        }
      }
    };
    
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastActiveRef.current?.focus();
    };
  }, [isOpen, goToPrev, goToNext, onClose]);

  // Handle swipe gestures
  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold && index > 0) {
      goToPrev();
    } else if (info.offset.x < -threshold && index < artworks.length - 1) {
      goToNext();
    }
  };

  if (!isOpen) return null;

  const a = artworks[index];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={`Viewing ${a.title}`}
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Backdrop with blur */}
        <motion.div
          className="absolute inset-0 bg-black/95 dark:bg-black/98 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Close button - floating top right */}
        <motion.button
          ref={closeRef}
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Navigation buttons - side arrows */}
        <motion.button
          ref={prevRef}
          onClick={goToPrev}
          disabled={index === 0}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: index === 0 ? 0.3 : 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute left-2 sm:left-4 md:left-8 z-50 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed hidden sm:flex"
          aria-label="Previous artwork"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.button
          ref={nextRef}
          onClick={goToNext}
          disabled={index === artworks.length - 1}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: index === artworks.length - 1 ? 0.3 : 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute right-2 sm:right-4 md:right-8 z-50 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed hidden sm:flex"
          aria-label="Next artwork"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Main content - swipeable on mobile */}
        <motion.div
          className="relative w-full h-full flex flex-col items-center justify-center px-4 py-16 sm:px-12 sm:py-20"
          drag="x"
          dragControls={dragControls}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={a.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative max-w-5xl w-full flex flex-col items-center"
            >
              {/* Image container */}
              <motion.div
                className={`relative w-full bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
                animate={{ scale: isZoomed ? 1.5 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={a.image}
                  alt={a.alt}
                  className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain"
                  layoutId={`artwork-${a.id}`}
                />
              </motion.div>

              {/* Info bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white"
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light">
                    {a.title}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <span>{a.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span>{a.medium}</span>
                  </div>
                </div>

                {/* Counter and mobile nav */}
                <div className="flex items-center gap-4">
                  {/* Mobile navigation */}
                  <div className="flex sm:hidden items-center gap-2">
                    <button
                      onClick={goToPrev}
                      disabled={index === 0}
                      className="p-2 rounded-full bg-white/10 disabled:opacity-30"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={goToNext}
                      disabled={index === artworks.length - 1}
                      className="p-2 rounded-full bg-white/10 disabled:opacity-30"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Counter */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="text-sm font-medium">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-white/40">/</span>
                    <span className="text-sm text-white/60">{String(artworks.length).padStart(2, '0')}</span>
                  </div>
                </div>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="w-full h-0.5 bg-white/10 mt-4 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-white/40"
                  initial={{ width: 0 }}
                  animate={{ width: `${((index + 1) / artworks.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Thumbnail strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex gap-2 overflow-x-auto pb-2 max-w-full scrollbar-hide"
              >
                {artworks.map((art, i) => (
                  <motion.button
                    key={art.id}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      onChangeIndex(i);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden transition-all ${
                      i === index 
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black' 
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </motion.div>

              {/* Swipe hint for mobile */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 text-xs text-white/40 sm:hidden"
              >
                Swipe to navigate
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Keyboard shortcuts hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 text-xs text-white/40"
        >
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Esc</kbd>
            Close
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
