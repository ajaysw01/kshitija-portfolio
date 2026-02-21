import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Skills/mediums data
const skills = [
  { name: "Graphite", level: 95, description: "Primary medium for detailed portraits" },
  { name: "Charcoal", level: 85, description: "Bold expressions and dramatic contrasts" },
  { name: "Ink", level: 80, description: "Fine line work and illustrations" },
  { name: "Mixed Media", level: 70, description: "Experimental combinations" },
];

// Stats data
const stats = [
  { value: "50+", label: "Artworks Created" },
  { value: "3+", label: "Years Experience" },
  { value: "100%", label: "Passion Driven" },
];

// Timeline data
const timeline = [
  { year: "2021", title: "The Beginning", description: "Started exploring sketching as a creative outlet" },
  { year: "2022", title: "Finding Style", description: "Discovered love for monochrome and minimal art" },
  { year: "2023", title: "Growing Collection", description: "Expanded portfolio with diverse subjects" },
  { year: "2024", title: "Refinement", description: "Focused on mastering graphite techniques" },
];

// Animated skill bar component
function SkillBar({ skill, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-charcoal dark:text-paper">{skill.name}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gray-400 to-charcoal dark:from-gray-500 dark:to-paper rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.15 + 0.3, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{skill.description}</p>
    </motion.div>
  );
}

// Timeline item component
function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center gap-4 sm:gap-8 ${isEven ? "" : "flex-row-reverse"} relative`}
    >
      {/* Content card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        className={`flex-1 ${isEven ? "text-right" : "text-left"}`}
      >
        <div className={`inline-block p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-800 ${isEven ? "mr-0" : "ml-0"}`}>
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{item.year}</span>
          <h4 className="text-lg sm:text-xl font-serif text-charcoal dark:text-paper mt-1">{item.title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs">{item.description}</p>
        </div>
      </motion.div>
      
      {/* Center dot and line */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
          className="w-4 h-4 rounded-full bg-charcoal dark:bg-paper z-10 ring-4 ring-gray-100 dark:ring-gray-800"
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
            className="w-0.5 h-24 sm:h-32 bg-gray-200 dark:bg-gray-700 origin-top"
          />
        )}
      </div>
      
      {/* Empty space for alternating layout */}
      <div className="flex-1 hidden sm:block" />
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    document.title = "About — Kshitija Dabhade";
    setMeta(
      "description",
      "About Kshitija Dabhade, sketch artist specializing in monochrome art with graphite, ink, and charcoal."
    );
  }, []);

  return (
    <motion.article
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-800 rounded-full blur-3xl opacity-50 pointer-events-none -z-10"
      />
      <motion.div
        style={{ y: backgroundY }}
        className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-gray-200 to-transparent dark:from-gray-700 rounded-full blur-3xl opacity-30 pointer-events-none -z-10"
      />

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20 lg:mb-28">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 lg:order-1"
        >
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            {/* Decorative frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -inset-4 sm:-inset-6 border-2 border-gray-200 dark:border-gray-700 rounded-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute -inset-2 sm:-inset-3 border border-gray-300 dark:border-gray-600 rounded-2xl"
            />
            
            {/* Main image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl dark:shadow-gray-900/70"
            >
              <motion.img
                src="/assets/images/hero.jpg"
                alt="Kshitija - Artist"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-charcoal dark:bg-paper text-paper dark:text-charcoal px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-xl"
            >
              <p className="text-xs uppercase tracking-wider font-medium">Artist</p>
              <p className="text-lg sm:text-xl font-serif mt-1">Since 2021</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Name and Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6 sm:space-y-8 order-2 lg:order-2"
        >
          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500"
            >
              Hello, I'm
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light dark:text-paper leading-tight"
            >
              Kshitija
              <br />
              <span className="text-gray-400 dark:text-gray-500">Dabhade</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="h-1 w-20 sm:w-24 bg-gradient-to-r from-charcoal to-gray-400 dark:from-paper dark:to-gray-600 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light"
          >
            Sketch Artist specializing in
            <span className="text-charcoal dark:text-paper font-normal"> monochrome art</span>
          </motion.p>

          {/* Medium tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap gap-2 sm:gap-3"
          >
            {["Graphite", "Ink", "Charcoal"].map((medium, index) => (
              <motion.span
                key={medium}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 cursor-default transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {medium}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 sm:mb-20 lg:mb-28"
      >
        <div className="grid grid-cols-3 gap-4 sm:gap-8 py-8 sm:py-12 border-y border-gray-200 dark:border-gray-800">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <motion.p
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                className="text-2xl sm:text-4xl md:text-5xl font-serif font-light text-charcoal dark:text-paper"
              >
                {stat.value}
              </motion.p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* About Content with Skills */}
      <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 sm:mb-20 lg:mb-28">
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">my story</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light dark:text-paper">
              The Journey
            </h2>
          </div>
          
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            <p>
              Sketching began as a personal practice, a quiet space where observation 
              meets expression. Over time, I developed a preference for working with 
              simple lines and limited tones.
            </p>
            <p>
              Keeping my work minimal helps me focus on what matters most — 
              <span className="text-charcoal dark:text-paper font-medium"> emotion, form, and the subtle interplay of light and shadow</span>.
            </p>
          </div>

          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative pl-6 py-4 border-l-4 border-gray-300 dark:border-gray-600 italic text-gray-500 dark:text-gray-400"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-charcoal to-transparent dark:from-paper origin-top"
            />
            "Each piece is an invitation to pause and observe — to find beauty in simplicity 
            and depth in monochrome."
          </motion.blockquote>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">expertise</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light dark:text-paper">
              Mediums
            </h2>
          </div>
          
          <div className="space-y-6 pt-4">
            {skills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 sm:mb-20"
      >
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2">journey</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light dark:text-paper">
            Timeline
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-0">
          {timeline.map((item, index) => (
            <TimelineItem 
              key={item.year} 
              item={item} 
              index={index}
              isLast={index === timeline.length - 1}
            />
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 sm:py-16 px-6 bg-gray-50 dark:bg-gray-900 rounded-3xl"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-light dark:text-paper mb-4">
          Want to see my work?
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
          Explore my collection of sketches and illustrations
        </p>
        <motion.a
          href="#/gallery"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-charcoal dark:bg-paper text-paper dark:text-charcoal text-sm uppercase tracking-widest font-medium rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          View Gallery
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </motion.section>
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
