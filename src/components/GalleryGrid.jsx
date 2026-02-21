import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import ArtworkCard from "./ArtworkCard.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
    rotateX: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Individual item with intersection observer for scroll-triggered animation
function GalleryItem({ artwork, index, onSelect, viewMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 3D tilt effect handler
  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  }, []);

  // Calculate masonry row span based on index pattern
  const getMasonrySpan = (idx) => {
    const pattern = [2, 1, 1, 2, 1, 2, 1, 1]; // Creates visual rhythm
    return pattern[idx % pattern.length] === 2 ? "row-span-2" : "row-span-1";
  };

  const tiltX = isHovered ? (mousePosition.y - 0.5) * 10 : 0;
  const tiltY = isHovered ? (mousePosition.x - 0.5) * -10 : 0;

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      }}
      onMouseMove={handleMouseMove}
      className={`relative group perspective-1000 ${
        viewMode === "masonry" ? getMasonrySpan(index) : ""
      }`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={{
          rotateX: tiltX,
          rotateY: tiltY,
          scale: isHovered ? 1.02 : 1,
          z: isHovered ? 50 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glow effect behind card */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-gray-400/20 via-gray-300/20 to-gray-400/20 dark:from-gray-600/20 dark:via-gray-500/20 dark:to-gray-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(-20px)" }}
        />
        
        {/* Card with shine effect */}
        <div className="relative h-full overflow-hidden rounded-xl">
          <ArtworkCard 
            artwork={artwork} 
            onSelect={onSelect} 
            mousePosition={mousePosition}
            isHovered={isHovered}
          />
          
          {/* Animated shine sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          />
        </div>
      </motion.div>

      {/* Bottom reflection effect */}
      <motion.div
        className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "scaleY(-0.3) translateZ(-10px)" }}
      />
    </motion.div>
  );
}

export default function GalleryGrid({ artworks, onSelect, viewMode = "masonry" }) {
  return (
    <motion.section
      aria-label="Gallery"
      className={`
        ${viewMode === "masonry" 
          ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 lg:gap-6 space-y-4 sm:space-y-5 lg:space-y-6"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        }
      `}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {artworks.map((artwork, index) => (
        <div 
          key={artwork.id} 
          className={viewMode === "masonry" ? "break-inside-avoid mb-4 sm:mb-5 lg:mb-6" : ""}
        >
          <GalleryItem
            artwork={artwork}
            index={index}
            onSelect={onSelect}
            viewMode={viewMode}
          />
        </div>
      ))}
    </motion.section>
  );
}
