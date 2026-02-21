import { motion } from "framer-motion";
import { useState } from "react";

export default function ArtworkCard({ artwork, onSelect, mousePosition = { x: 0.5, y: 0.5 }, isHovered = false }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(artwork)}
      className="group relative block w-full h-full focus:outline-none overflow-hidden rounded-xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-gray-900/80 transition-shadow duration-500 active:scale-[0.98] border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      aria-label={`View ${artwork.title}`}
    >
      {/* Image Container - varying heights for masonry effect */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
        )}
        
        <motion.img
          src={artwork.image}
          alt={artwork.alt}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-auto object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: isHovered 
              ? `scale(1.08) translate(${(mousePosition.x - 0.5) * -10}px, ${(mousePosition.y - 0.5) * -10}px)` 
              : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
        
        {/* Animated vignette on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, transparent 0%, rgba(0,0,0,0.4) 70%)`,
          }}
        />

        {/* Animated scan line effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />

        {/* Corner accents that animate in */}
        <div className="absolute top-3 left-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-white/60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          <div className="absolute top-0 left-0 w-0.5 h-full bg-white/60 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-75" />
        </div>
        <div className="absolute bottom-16 right-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-white/60 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-white/60 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-75" />
        </div>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <motion.div
          initial={{ y: 10, opacity: 0.9 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          {/* Title with animated underline */}
          <div className="relative inline-block">
            <h3 className="text-sm sm:text-base text-white font-medium tracking-wide drop-shadow-lg">
              {artwork.title}
            </h3>
            <motion.div
              className="absolute -bottom-0.5 left-0 h-0.5 bg-white/70"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Metadata row */}
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {artwork.year}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span className="uppercase tracking-wider text-[10px] text-white/60">
              {artwork.medium?.replace(" sketch", "") || "Graphite"}
            </span>
          </div>

          {/* View action - slides up on hover */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="inline-flex items-center gap-2 text-xs text-white/90 uppercase tracking-widest font-medium group/btn">
              <span className="relative">
                View
                <motion.span 
                  className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover/btn:w-full transition-all duration-200"
                />
              </span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle pulse ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-white/20 opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={false}
        animate={isHovered ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.button>
  );
}
