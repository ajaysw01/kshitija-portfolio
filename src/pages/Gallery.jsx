import { lazy, Suspense, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import artworks from "../data/artworks.json";
import GalleryGrid from "../components/GalleryGrid.jsx";

const ArtworkModal = lazy(() => import("../components/ArtworkModal.jsx"));

// Extract unique categories from artworks
const categories = ["All", ...new Set(artworks.map(a => {
  const medium = a.medium.toLowerCase();
  if (medium.includes("graphite")) return "Graphite";
  if (medium.includes("ink")) return "Ink";
  if (medium.includes("charcoal")) return "Charcoal";
  return "Mixed";
}))];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState("masonry"); // 'grid' or 'masonry'

  useEffect(() => {
    document.title = "Gallery — Kshitija Dabhade";
    setMeta(
      "description",
      "Explore the full gallery of graphite sketches by Kshitija Dabhade."
    );
  }, []);

  const filteredArtworks = useMemo(() => {
    if (activeFilter === "All") return artworks;
    return artworks.filter(a => {
      const medium = a.medium.toLowerCase();
      return medium.includes(activeFilter.toLowerCase());
    });
  }, [activeFilter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 sm:space-y-8 py-6 sm:py-8 md:py-12 px-4 sm:px-0"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500"
            >
              Collection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="dark:text-paper text-4xl sm:text-5xl md:text-6xl font-serif font-light"
            >
              Gallery
            </motion.h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-all ${viewMode === "grid" 
                  ? "bg-white dark:bg-gray-700 shadow-sm" 
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                aria-label="Grid view"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-2 rounded transition-all ${viewMode === "masonry" 
                  ? "bg-white dark:bg-gray-700 shadow-sm" 
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                aria-label="Masonry view"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm9-1a1 1 0 00-1 1v6a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zM4 11a1 1 0 00-1 1v4a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 00-1-1H4zm8 2a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z" />
                </svg>
              </button>
            </div>
            
            {/* Count Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {filteredArtworks.length}
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {filteredArtworks.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-2 sm:gap-3"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium tracking-wide rounded-full transition-all duration-300 overflow-hidden ${
                activeFilter === category
                  ? "text-white dark:text-charcoal"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {/* Active background */}
              {activeFilter === category && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-charcoal dark:bg-paper rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Gallery Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <GalleryGrid
            artworks={filteredArtworks}
            viewMode={viewMode}
            onSelect={(a) =>
              setOpenIndex(artworks.findIndex((x) => x.id === a.id))
            }
          />
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredArtworks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-400 dark:text-gray-500">
            No artworks found in this category
          </p>
        </motion.div>
      )}

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
