import { motion } from "framer-motion";
import ArtworkCard from "./ArtworkCard.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function GalleryGrid({ artworks, onSelect }) {
  return (
    <motion.section
      aria-label="Gallery"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 xl:gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {artworks.map((a, index) => (
        <motion.div
          key={a.id}
          variants={itemVariants}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative group"
          style={{
            // Add subtle random rotation for organic feel
            rotate: index % 3 === 0 ? -0.5 : index % 2 === 0 ? 0.5 : 0,
          }}
        >
          {/* Decorative corner accent */}
          <motion.div
            className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-gray-300 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            initial={{ scale: 0, rotate: -45 }}
            whileHover={{ scale: 1, rotate: 0 }}
          />
          <motion.div
            className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-gray-300 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            initial={{ scale: 0, rotate: -45 }}
            whileHover={{ scale: 1, rotate: 0 }}
          />

          <ArtworkCard artwork={a} onSelect={onSelect} />

          {/* Subtle index number overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-charcoal/90 backdrop-blur-sm flex items-center justify-center text-xs font-medium text-charcoal dark:text-paper shadow-lg pointer-events-none"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.div>
        </motion.div>
      ))}
    </motion.section>
  );
}
