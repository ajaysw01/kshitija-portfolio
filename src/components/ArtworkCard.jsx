import { motion } from "framer-motion";

export default function ArtworkCard({ artwork, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(artwork)}
      className="group relative block w-full focus:outline-none overflow-hidden rounded-lg shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900/80 transition-shadow duration-300 active:scale-95"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-label={`View ${artwork.title}`}
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-gray-800">
        <img
          src={artwork.image}
          alt={artwork.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1 group-active:scale-105"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 md:p-5">
        <span className="text-xs sm:text-sm text-white font-light tracking-wide drop-shadow-lg">
          {artwork.title}
        </span>
      </div>
    </motion.button>
  );
}
