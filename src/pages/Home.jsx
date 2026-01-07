import { useEffect } from "react";
import { motion } from "framer-motion";
import artworks from "../data/artworks.json";
import GalleryGrid from "../components/GalleryGrid.jsx";

export default function Home() {
  useEffect(() => {
    document.title = "Kshitija Dabhade — Sketch Artist Portfolio";
    setMeta(
      "description",
      "Monochrome sketches exploring light, shadow, and form by Kshitija Dabhade. Featured artworks and gallery."
    );
  }, []);

  const featured = artworks.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-12 md:space-y-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="relative w-full h-full">
            <img
              src="/assets/images/hero_landscape.jpg"
              alt="Artist's workspace"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30"></div>
          </div>
        </motion.div>

        <div className="relative z-10 container text-center space-y-8 sm:space-y-10 px-4 sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mx-auto leading-relaxed font-light tracking-wide px-4"
          >
            Monochrome sketches exploring light, shadow, and form
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.a
              href="#/gallery"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border-2 border-white/60 text-white hover:bg-white hover:text-charcoal transition-all duration-300 text-xs sm:text-sm uppercase tracking-widest font-medium shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Gallery
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-white/60"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Works Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-6 sm:space-y-8 py-6 sm:py-8 px-4 sm:px-0"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="uppercase tracking-widest text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-sans font-medium">
            Featured Works
          </h2>
        </motion.div>
        <GalleryGrid artworks={featured} />
      </motion.section>
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
