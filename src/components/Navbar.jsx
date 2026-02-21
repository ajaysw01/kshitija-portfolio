import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSun, HiMoon, HiMenu, HiX } from "react-icons/hi";
import { useDarkMode } from "../context/DarkModeContext";

const links = [
  { href: "#/", label: "Home", path: "/" },
  { href: "#/gallery", label: "Gallery", path: "/gallery" },
  { href: "#/about", label: "About", path: "/about" },
  { href: "#/contact", label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [currentPath, setCurrentPath] = useState(
    window.location.hash.replace("#", "") || "/"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Kshitija Dabhade — Sketch Artist";

    const handleHashChange = () => {
      setCurrentPath(window.location.hash.replace("#", "") || "/");
      setMobileMenuOpen(false); // Close menu on navigation
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-paper/80 dark:bg-charcoal/80 backdrop-blur-md shadow-sm dark:shadow-gray-900/20"
    >
      <nav
        className="container flex items-center justify-between py-4 sm:py-6 md:py-8 px-4 sm:px-6"
        aria-label="Main"
      >
        <a href="#/" className="no-underline group flex-shrink-0">
          <img
            src="/assets/images/logo.png"
            alt="KD logo"
            className="h-10 sm:h-12 md:h-14 w-auto transition-opacity group-hover:opacity-80"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex gap-6 lg:gap-10">
            {links.map((l) => {
              const isActive = currentPath === l.path;
              return (
                <li key={l.href} className="relative">
                  <a
                    className={`text-xs lg:text-sm uppercase tracking-wider font-medium no-underline transition-colors dark:text-paper ${
                      isActive
                        ? "text-charcoal dark:text-paper"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                    href={l.href}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-charcoal dark:bg-paper"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            aria-label="Toggle dark mode"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? (
                <HiMoon className="w-5 h-5 text-yellow-400" />
              ) : (
                <HiSun className="w-5 h-5 text-orange-500" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            aria-label="Toggle dark mode"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? (
                <HiMoon className="w-5 h-5 text-yellow-400" />
              ) : (
                <HiSun className="w-5 h-5 text-orange-500" />
              )}
            </motion.div>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <HiX className="w-6 h-6 text-charcoal dark:text-paper" />
            ) : (
              <HiMenu className="w-6 h-6 text-charcoal dark:text-paper" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-paper/95 dark:bg-charcoal/95 backdrop-blur-md"
          >
            <ul className="container px-4 sm:px-6 py-4 space-y-1">
              {links.map((l) => {
                const isActive = currentPath === l.path;
                return (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <a
                      className={`block px-4 py-3 text-sm uppercase tracking-wider font-medium no-underline transition-colors rounded-lg ${
                        isActive
                          ? "bg-gray-100 dark:bg-gray-800 text-charcoal dark:text-paper"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100"
                      }`}
                      href={l.href}
                    >
                      {l.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
