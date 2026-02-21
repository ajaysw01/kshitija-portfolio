import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function Contact() {
  const [formState, setFormState] = useState("idle"); // idle, submitting, success, error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "Contact — Kshitija Dabhade";
    setMeta(
      "description",
      "Get in touch with Kshitija Dabhade for commissions or inquiries."
    );
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState("submitting");

    try {
      // Encode form data properly for Netlify
      const body = new URLSearchParams({
        "form-name": "contact",
        "name": formData.name,
        "email": formData.email,
        "message": formData.message
      }).toString();
      
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      });

      if (response.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
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
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        {/* Netlify form fields */}
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />

        <motion.label
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="block space-y-2"
        >
          <span className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">
            Name <span className="text-red-500">*</span>
          </span>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={`w-full border ${
              errors.name
                ? "border-red-500 dark:border-red-500"
                : "border-gray-200 dark:border-gray-700"
            } dark:bg-gray-800 dark:text-paper px-4 py-3 text-sm focus:border-charcoal dark:focus:border-paper focus:outline-none transition-all duration-300 focus:shadow-lg focus:ring-2 focus:ring-charcoal/20 dark:focus:ring-paper/20 rounded-md`}
            placeholder="Your name"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-red-500 flex items-center gap-1"
              >
                <HiXCircle className="w-4 h-4" />
                {errors.name}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.label>

        <motion.label
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="block space-y-2"
        >
          <span className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">
            Email <span className="text-red-500">*</span>
          </span>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full border ${
              errors.email
                ? "border-red-500 dark:border-red-500"
                : "border-gray-200 dark:border-gray-700"
            } dark:bg-gray-800 dark:text-paper px-4 py-3 text-sm focus:border-charcoal dark:focus:border-paper focus:outline-none transition-all duration-300 focus:shadow-lg focus:ring-2 focus:ring-charcoal/20 dark:focus:ring-paper/20 rounded-md`}
            placeholder="your.email@example.com"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-red-500 flex items-center gap-1"
              >
                <HiXCircle className="w-4 h-4" />
                {errors.email}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.label>

        <motion.label
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="block space-y-2"
        >
          <span className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">
            Message <span className="text-red-500">*</span>
          </span>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            name="message"
            rows="6"
            required
            value={formData.message}
            onChange={handleChange}
            className={`w-full border ${
              errors.message
                ? "border-red-500 dark:border-red-500"
                : "border-gray-200 dark:border-gray-700"
            } dark:bg-gray-800 dark:text-paper px-4 py-3 text-sm focus:border-charcoal dark:focus:border-paper focus:outline-none transition-all duration-300 resize-none focus:shadow-lg focus:ring-2 focus:ring-charcoal/20 dark:focus:ring-paper/20 rounded-md`}
            placeholder="Tell me about your project or inquiry..."
          />
          <AnimatePresence>
            {errors.message && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-red-500 flex items-center gap-1"
              >
                <HiXCircle className="w-4 h-4" />
                {errors.message}
              </motion.span>
            )}
          </AnimatePresence>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {formData.message.length} / 500 characters
          </span>
        </motion.label>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          whileHover={formState === "idle" ? { scale: 1.05, y: -2 } : {}}
          whileTap={formState === "idle" ? { scale: 0.98 } : {}}
          type="submit"
          disabled={formState === "submitting" || formState === "success"}
          className={`relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 border overflow-hidden
            ${
              formState === "success"
                ? "border-green-500 bg-green-500 text-white"
                : formState === "error"
                ? "border-red-500 bg-red-500 text-white"
                : "border-charcoal dark:border-paper bg-charcoal dark:bg-paper text-white dark:text-charcoal hover:bg-transparent dark:hover:bg-transparent hover:text-charcoal dark:hover:text-paper"
            }
            text-xs uppercase tracking-wider font-medium transition-all duration-300 shadow-lg hover:shadow-2xl rounded-md
            disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          <AnimatePresence mode="wait">
            {formState === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2"
              >
                Send Message
              </motion.span>
            )}
            {formState === "submitting" && (
              <motion.span
                key="submitting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Sending...
              </motion.span>
            )}
            {formState === "success" && (
              <motion.span
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                >
                  <HiCheckCircle className="w-5 h-5" />
                </motion.div>
                Message Sent!
              </motion.span>
            )}
            {formState === "error" && (
              <motion.span
                key="error"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-center gap-2"
              >
                <HiXCircle className="w-5 h-5" />
                Failed. Try Again
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {formState === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-md border border-green-200 dark:border-green-800"
          >
            <HiCheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>Thank you! I'll get back to you soon.</span>
          </motion.div>
        )}
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
