import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import artworks from "../data/artworks.json";
import GalleryGrid from "../components/GalleryGrid.jsx";

const ArtworkModal = lazy(() => import("../components/ArtworkModal.jsx"));

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    document.title = "Gallery — Kshitija Dabhade";
    setMeta(
      "description",
      "Explore the full gallery of graphite sketches by Kshitija Dabhade."
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 sm:space-y-12 py-6 sm:py-8 md:py-12 px-4 sm:px-0"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="dark:text-paper text-3xl sm:text-4xl md:text-5xl font-serif font-light"
          >
            Gallery
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <span className="font-medium">{artworks.length}</span>
            <span>{artworks.length === 1 ? "artwork" : "artworks"}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GalleryGrid
          artworks={artworks}
          onSelect={(a) =>
            setOpenIndex(artworks.findIndex((x) => x.id === a.id))
          }
        />
      </motion.div>

      <Suspense fallback={null}>
        <ArtworkModal
          isOpen={openIndex !== null}
          artworks={artworks}
          index={openIndex ?? 0}
          onClose={() => setOpenIndex(null)}
          onChangeIndex={setOpenIndex}
        />
      </Suspense>
    </motion.div>
  );
}

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
