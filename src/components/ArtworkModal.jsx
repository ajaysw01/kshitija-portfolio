import { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

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

  useEffect(() => {
    if (!isOpen) return;
    lastActiveRef.current = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChangeIndex(Math.max(index - 1, 0));
      if (e.key === "ArrowRight")
        onChangeIndex(Math.min(index + 1, artworks.length - 1));
      if (e.key === "Tab") {
        const focusOrder = [closeRef.current, prevRef.current, nextRef.current];
        const currentIdx = focusOrder.indexOf(document.activeElement);
        if (e.shiftKey) {
          const target =
            focusOrder[
              (currentIdx - 1 + focusOrder.length) % focusOrder.length
            ];
          target?.focus();
          e.preventDefault();
        } else {
          const target = focusOrder[(currentIdx + 1) % focusOrder.length];
          target?.focus();
          e.preventDefault();
        }
      }
    };
    const onClick = (e) => {
      if (e.target === e.currentTarget) onClose();
    };
    document.addEventListener("keydown", onKey);
    const overlay = document.getElementById("artwork-modal-overlay");
    overlay?.addEventListener("click", onClick);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      overlay?.removeEventListener("click", onClick);
      lastActiveRef.current && lastActiveRef.current.focus();
    };
  }, [isOpen, index, artworks.length, onClose, onChangeIndex]);

  if (!isOpen) return null;

  const a = artworks[index];

  return (
    <AnimatePresence>
      <motion.div
        id="artwork-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={`Viewing ${a.title}`}
        className="fixed inset-0 z-50 bg-black/95 dark:bg-black/98 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex h-full w-full items-center justify-center p-6 md:p-12">
          <motion.div
            className="relative max-w-6xl w-full bg-paper dark:bg-gray-900 shadow-2xl dark:shadow-gray-950/80"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-6 py-4">
              <div>
                <h2 className="font-serif text-lg md:text-xl font-light dark:text-paper">
                  {a.title}
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {a.year}
                </p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="text-xs uppercase tracking-wider px-4 py-2 border border-gray-200 dark:border-gray-700 hover:border-charcoal dark:hover:border-paper hover:bg-charcoal dark:hover:bg-paper hover:text-white dark:hover:text-charcoal transition-all"
                aria-label="Close modal"
              >
                Close
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 p-8 md:p-12">
              <img
                src={a.image}
                alt={a.alt}
                className="mx-auto h-auto w-full max-h-[60vh] md:max-h-[70vh] object-contain"
              />
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 px-6 py-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
                {a.medium}
              </p>
              <div className="flex gap-3">
                <button
                  ref={prevRef}
                  onClick={() => onChangeIndex(Math.max(index - 1, 0))}
                  disabled={index === 0}
                  className="text-xs uppercase tracking-wider px-4 py-2 border border-gray-200 dark:border-gray-700 hover:border-charcoal dark:hover:border-paper hover:bg-charcoal dark:hover:bg-paper hover:text-white dark:hover:text-charcoal transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Previous artwork"
                >
                  ← Prev
                </button>
                <button
                  ref={nextRef}
                  onClick={() =>
                    onChangeIndex(Math.min(index + 1, artworks.length - 1))
                  }
                  disabled={index === artworks.length - 1}
                  className="text-xs uppercase tracking-wider px-4 py-2 border border-gray-200 dark:border-gray-700 hover:border-charcoal dark:hover:border-paper hover:bg-charcoal dark:hover:bg-paper hover:text-white dark:hover:text-charcoal transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Next artwork"
                >
                  Next →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
