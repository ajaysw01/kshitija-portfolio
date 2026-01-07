import { motion } from "framer-motion";

export default function ArtworkCard({ artwork, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(artwork)}
      className="group relative block w-full focus:outline-none overflow-hidden rounded-xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900/80 transition-all duration-500 active:scale-95 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-label={`View ${artwork.title}`}
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-gray-800 relative">
        <motion.img
          src={artwork.image}
          alt={artwork.alt}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Overlay gradient - appears on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect on hover */}
        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 space-y-2">
        <motion.div
          initial={{ y: 10, opacity: 0.8 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-1"
        >
          <h3 className="text-sm sm:text-base text-white font-medium tracking-wide drop-shadow-lg">
            {artwork.title}
          </h3>

          {/* Additional details - fade in on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            whileHover={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 text-xs text-white/80 pt-1">
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                {artwork.year}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/60"></span>
              <span className="uppercase tracking-wider text-white/70">
                Graphite Sketch
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* View button - appears on hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pt-2"
        >
          <span className="inline-flex items-center gap-2 text-xs text-white/90 uppercase tracking-widest font-medium">
            View Details
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </motion.div>
      </div>
    </motion.button>
  );
}
