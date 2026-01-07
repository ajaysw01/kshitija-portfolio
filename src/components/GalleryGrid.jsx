import { motion } from "framer-motion";
import ArtworkCard from "./ArtworkCard.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function GalleryGrid({ artworks, onSelect }) {
  return (
    <motion.section
      aria-label="Gallery"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {artworks.map((a, index) => (
        <motion.div key={a.id} variants={itemVariants}>
          <ArtworkCard artwork={a} onSelect={onSelect} />
        </motion.div>
      ))}
    </motion.section>
  );
}
