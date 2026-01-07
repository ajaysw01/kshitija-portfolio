import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact — Kshitija Dabhade";
    setMeta(
      "description",
      "Get in touch with Kshitija Dabhade for commissions or inquiries."
    );
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Portfolio Inquiry");
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nEmail: ${form.get(
        "email"
      )}\nMessage: ${form.get("message")}`
    );
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl space-y-8 sm:space-y-10 md:space-y-12 py-6 sm:py-8 md:py-12 px-4 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4"
      >
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="dark:text-paper text-3xl sm:text-4xl md:text-5xl"
        >
          Contact
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-500 dark:text-gray-400"
        >
          For commissions, inquiries, or to discuss a project.
        </motion.p>
      </motion.div>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        onSubmit={onSubmit}
        className="space-y-6"
        aria-label="Contact form"
      >
        <motion.label
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="block space-y-2"
        >
          <span className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">
            Name
          </span>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            name="name"
            type="text"
            required
            className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-paper px-4 py-3 text-sm focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none transition-all duration-300 focus:shadow-lg"
          />
        </motion.label>
        <motion.label
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="block space-y-2"
        >
          <span className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">
            Email
          </span>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            name="email"
            type="email"
            required
            className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-paper px-4 py-3 text-sm focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none transition-all duration-300 focus:shadow-lg"
          />
        </motion.label>
        <motion.label
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="block space-y-2"
        >
          <span className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">
            Message
          </span>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            name="message"
            rows="6"
            required
            className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-paper px-4 py-3 text-sm focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none transition-all duration-300 resize-none focus:shadow-lg"
          />
        </motion.label>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 border border-charcoal dark:border-paper bg-charcoal dark:bg-paper text-white dark:text-charcoal text-xs uppercase tracking-wider font-medium hover:bg-transparent dark:hover:bg-transparent hover:text-charcoal dark:hover:text-paper transition-all duration-200 shadow-lg hover:shadow-2xl"
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.section>
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
