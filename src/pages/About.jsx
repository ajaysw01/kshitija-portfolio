import { useEffect } from "react";
import { motion } from "framer-motion";

export default function About() {
  useEffect(() => {
    document.title = "About — Kshitija Dabhade";
    setMeta(
      "description",
      "About Kshitija Dabhade, sketch artist specializing in monochrome art with graphite, ink, and charcoal."
    );
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto space-y-10 sm:space-y-12 md:space-y-16 py-6 sm:py-8 md:py-12 px-4 sm:px-6 relative"
    >
      {/* Profile Section */}
      <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
        {/* Profile Image with Animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            className="relative w-full max-w-md mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated rings around image */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-600 opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-gray-400 dark:border-gray-500 opacity-30"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Main image container */}
            <motion.div
              className="relative aspect-square rounded-full overflow-hidden shadow-2xl dark:shadow-gray-900/50 border-4 border-paper dark:border-charcoal ring-4 ring-gray-200 dark:ring-gray-700"
              initial={{ rotate: -5 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.img
                src="/assets/images/hero.jpg"
                alt="Kshitija - Artist"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-charcoal/20 dark:to-paper/10" />
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full opacity-40 blur-xl"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full opacity-30 blur-xl"
              animate={{
                y: [0, 15, 0],
                x: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Name and Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light dark:text-paper"
            >
              Kshitija Dabhade
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="h-1 w-24 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light"
          >
            Sketch Artist
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-3"
          >
            {["Graphite", "Ink", "Charcoal"].map((medium, index) => (
              <motion.span
                key={medium}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
              >
                {medium}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* About Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xl sm:text-2xl md:text-3xl font-serif font-light dark:text-paper"
        >
          My Journey
        </motion.h2>
        <div className="space-y-6 text-base md:text-lg leading-relaxed dark:text-gray-300">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Sketching began as a personal practice. Over time, I developed a
            preference for working with simple lines and limited tones. Keeping
            my work minimal helps me focus on expression and form. This
            portfolio features selected sketches created using graphite, ink,
            and charcoal.
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative text-gray-500 dark:text-gray-400 text-sm md:text-base italic border-l-4 border-gray-300 dark:border-gray-600 pl-6 py-4 my-8"
          >
            <motion.div
              className="absolute -left-1 top-0 w-2 h-full bg-gradient-to-b from-gray-400 to-transparent dark:from-gray-500"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            />
            "Each piece is an invitation to pause and observe — to find beauty
            in simplicity and depth in monochrome."
          </motion.blockquote>
        </div>
      </motion.div>

      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-transparent dark:from-gray-700/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-gray-300/20 to-transparent dark:from-gray-600/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.article>
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
