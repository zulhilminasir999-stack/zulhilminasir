import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Send, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { ClientInquiry } from "../types";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const existingInquiriesRaw = localStorage.getItem("designer_inquiries");
      let currentInquiries: ClientInquiry[] = [];
      
      if (existingInquiriesRaw) {
        try {
          currentInquiries = JSON.parse(existingInquiriesRaw);
        } catch {
          currentInquiries = [];
        }
      }

      const formattedTimestamp = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }) + ", " + new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });

      const newInquiry: ClientInquiry = {
        id: `inq-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        company: "N/A (Individual)",
        projectType: "General Inquiry",
        budget: "N/A",
        timeline: "N/A",
        details: `Client Message:\n"${formData.message}"`,
        timestamp: formattedTimestamp,
        status: "Unread"
      };

      const updatedInquiries = [newInquiry, ...currentInquiries];
      localStorage.setItem("designer_inquiries", JSON.stringify(updatedInquiries));

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    }, 1000);
  };

  return (
    <div id="contact-form-inner" className="w-full max-w-4xl mx-auto">
      
      {/* Framer-inspired Premium Card with smooth -45-degree blue-cyan to theme blue gradient, elegant shadows and border radius */}
      <div className="bg-[linear-gradient(-45deg,#06b6d4,#0A2947)] border border-white/20 shadow-[0_24px_80px_rgba(6,182,212,0.15)] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="collaborate-form"
              onSubmit={handleSubmit}
              className="space-y-6 sm:space-y-8 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              
              {/* Main Heading styled exactly like the video */}
              <div className="text-center space-y-3 mb-8 sm:mb-10">
                <h3 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl !text-white tracking-tight leading-tight">
                  Let's Build Something Exceptional
                </h3>
              </div>

              {/* Simplified Validation Alert */}
              {Object.keys(errors).length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs sm:text-sm font-semibold flex items-center gap-2 max-w-2xl mx-auto"
                >
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>Please fill out all the fields below.</span>
                </motion.div>
              )}

              {/* Name field matching the video's card style */}
              <div className="space-y-2 max-w-2xl mx-auto">
                <label className="font-sans text-sm font-semibold !text-white block">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-white/45 rounded-2xl focus:border-blue-400/85 focus:bg-white/10 focus:shadow-[0_4px_20px_rgba(59,130,246,0.15)] transition-all outline-none ${
                    errors.name ? "border-rose-400 focus:border-rose-400" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-rose-400 text-xs font-semibold font-sans mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email field matching the video's card style */}
              <div className="space-y-2 max-w-2xl mx-auto">
                <label className="font-sans text-sm font-semibold !text-white block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-white/45 rounded-2xl focus:border-blue-400/85 focus:bg-white/10 focus:shadow-[0_4px_20px_rgba(59,130,246,0.15)] transition-all outline-none ${
                    errors.email ? "border-rose-400 focus:border-rose-400" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-rose-400 text-xs font-semibold font-sans mt-1">{errors.email}</p>
                )}
              </div>

              {/* Project Details / message field matching the video's card style */}
              <div className="space-y-2 max-w-2xl mx-auto">
                <label className="font-sans text-sm font-semibold !text-white block">
                  Project Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project"
                  className={`w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-white/45 rounded-2xl focus:border-blue-400/85 focus:bg-white/10 focus:shadow-[0_4px_20px_rgba(59,130,246,0.15)] transition-all outline-none resize-none ${
                    errors.message ? "border-rose-400 focus:border-rose-400" : ""
                  }`}
                />
                {errors.message ? (
                  <p className="text-rose-400 text-xs font-semibold font-sans mt-1">{errors.message}</p>
                ) : (
                  <p className="!text-white/80 text-xs font-sans mt-1">Min 10 characters.</p>
                )}
              </div>

              {/* Submit button matching the premium video's aesthetic with a beautiful blue gradient */}
              <div className="pt-4 max-w-2xl mx-auto">
                <motion.button
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 hover:opacity-95 text-white font-sans font-semibold tracking-wider text-sm rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.25)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white">Sending...</span>
                    </>
                  ) : (
                    <span className="text-white font-bold tracking-wide">Submit</span>
                  )}
                </motion.button>
              </div>

            </motion.form>
          ) : (
            <motion.div 
              key="collaborate-success"
              className="py-12 px-4 text-center space-y-6 relative z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="font-sans font-bold text-2xl text-white">
                  Message Sent!
                </h3>
                <p className="text-sm text-white/80 leading-relaxed font-sans font-medium">
                  Thank you. Zulhilmi will review your message and reply back shortly.
                </p>
              </div>

              <div className="pt-4 max-w-sm mx-auto">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/5 text-white font-semibold font-sans text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  <span>Send Another Message</span>
                  <ArrowRight className="h-4 w-4 text-white/60" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
