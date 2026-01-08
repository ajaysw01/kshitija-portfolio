import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.instagram.com/art_byhorizon?igsh=MWtxZXk4cnBvbmF4YQ==",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "mailto:kshitijadabhade454@gmail.com",
    icon: FaEnvelope,
    label: "Email",
  },
  { href: "#", icon: FaTwitter, label: "Twitter" },
  { href: "#", icon: FaLinkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 dark:border-gray-700/60 mt-auto bg-gradient-to-b from-paper to-gray-50 dark:from-charcoal dark:to-gray-950 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.4)]">
      <div className="container py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center md:items-start gap-2 sm:gap-3"
          >
            <p className="font-serif text-xl sm:text-2xl tracking-tight text-charcoal dark:text-paper">
              Kshitija Dabhade
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 tracking-wide">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 italic mt-1">
              Crafted with passion for art
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-3 sm:gap-4"
          >
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
              Connect With Me
            </p>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="p-2.5 sm:p-3 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-br hover:from-gray-800 hover:to-charcoal hover:text-white dark:hover:from-gray-100 dark:hover:to-white dark:hover:text-charcoal transition-all duration-500 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 hover:border-transparent"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ y: -5, scale: 1.15, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200/40 dark:border-gray-700/40"
        >
          <p className="text-center text-xs text-gray-600 dark:text-gray-500">
            Designed & Developed with ❤️ for showcasing artistic excellence
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
