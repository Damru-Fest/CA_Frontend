"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
export default function FormInfo({ onSubmit, submitting = false }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    college: "",
    yearOfStudy: "",
    stream: "",
    linkedinUrl: "",
    instagramUrl: "",
    previousExperience: "",
    whyAmbassador: "",
  });

  const safeTrim = (v) => (typeof v === "string" ? v.trim() : "");

  const canNext = useMemo(() => {
    if (step === 0)
      return (
        safeTrim(data.college).length > 0 &&
        safeTrim(data.yearOfStudy).length > 0
      );
    if (step === 1) return true;
    if (step === 2) return true;
    if (step === 3) return safeTrim(data.whyAmbassador).length > 0;
    return false;
  }, [step, data]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 10 : -10, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 10 : -10, opacity: 0 }),
  };

  const next = () => {
    console.debug("next clicked", { step, canNext });
    if (!canNext) {
      if (step === 0) {
        const el = document.querySelector('input[name="college"]');
        if (el) el.focus();
      }
      return;
    }
    if (step < 3) setStep((s) => s + 1);
  };
  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.debug("field change", name, value);
    setData((d) => ({ ...d, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Only allow submission if we're on step 3 and form is valid
    if (step !== 3 || !canNext || submitting) {
      return;
    }

    if (onSubmit) onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="relative min-h-[320px]">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">Step {step + 1} of 4</span>
          <span className="text-sm text-gray-400">{Math.round(((step + 1) / 4) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-amber-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence initial={false} custom={1} mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col"
          >
            <label className="mb-2" htmlFor="college">College *</label>
            <input
              id="college"
              name="college"
              value={data.college}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="Enter your college name"
              required
              aria-describedby={safeTrim(data.college).length === 0 ? "college-error" : undefined}
            />
            {safeTrim(data.college).length === 0 && (
              <p id="college-error" className="text-red-400 text-sm mb-2">College name is required</p>
            )}

            <label className="mb-2" htmlFor="yearOfStudy">Year of Study *</label>
            <input
              id="yearOfStudy"
              name="yearOfStudy"
              value={data.yearOfStudy}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="e.g., 2nd Year, Final Year"
              required
              aria-describedby={safeTrim(data.yearOfStudy).length === 0 ? "year-error" : undefined}
            />
            {safeTrim(data.yearOfStudy).length === 0 && (
              <p id="year-error" className="text-red-400 text-sm mb-2">Year of study is required</p>
            )}

            <label className="mb-2" htmlFor="stream">Stream</label>
            <input
              id="stream"
              name="stream"
              value={data.stream}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="e.g., Computer Science, Business"
            />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col"
          >
            <label className="mb-2" htmlFor="linkedinUrl">LinkedIn Profile</label>
            <input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              value={data.linkedinUrl}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="https://linkedin.com/in/your-profile"
            />

            <label className="mb-2" htmlFor="instagramUrl">Instagram Profile</label>
            <input
              id="instagramUrl"
              name="instagramUrl"
              type="url"
              value={data.instagramUrl}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors"
              placeholder="https://instagram.com/your-username"
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col"
          >
            <label className="mb-2" htmlFor="previousExperience">
              Previous Ambassador / Leadership Experience
            </label>
            <textarea
              id="previousExperience"
              name="previousExperience"
              value={data.previousExperience}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors resize-vertical"
              rows={5}
              placeholder="Tell us about any previous ambassador roles, leadership positions, or relevant experience..."
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col"
          >
            <label className="mb-2" htmlFor="whyAmbassador">
              Why do you want to be a Campus Ambassador? *
            </label>
            <textarea
              id="whyAmbassador"
              name="whyAmbassador"
              value={data.whyAmbassador}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors resize-vertical"
              rows={6}
              required
              placeholder="Share your motivation and what you hope to achieve as a Campus Ambassador..."
              aria-describedby={safeTrim(data.whyAmbassador).length === 0 ? "why-error" : undefined}
            />
            {safeTrim(data.whyAmbassador).length === 0 && (
              <p id="why-error" className="text-red-400 text-sm mb-2">This field is required</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-4">
        <div>
          {step < 4 && (
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              aria-label="Go to previous step"
              className={`inline-flex items-center justify-center
              h-10 w-[137px]
              gap-2.5 rounded-[30px]
              bg-black px-5 py-2.5
              font-semibold text-white
              border-2 border-[#FF931E]
              transition-all duration-150
              shadow-[0px_3px_0px_0px_#FF931E]
              active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E] ${
                step === 0 ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0px_4px_0px_0px_#FF931E]"
              }`}
            >
              Back
            </button>
          )}
        </div>
        <div>
          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              aria-label="Go to next step"
              className={`inline-flex items-center justify-center
              h-10 w-[137px]
              gap-2.5 rounded-[30px]
              bg-white px-5 py-2.5
              font-semibold text-black
              shadow-[0px_5px_0px_0px_#FF931E]
              transition-all duration-150
              active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E] ${
                !canNext ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0px_4px_0px_0px_#FF931E]"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !canNext}
              aria-label="Submit application"
              aria-busy={submitting}
              className={`inline-flex items-center justify-center
              h-10 w-[137px]
              gap-2.5 rounded-[30px]
              bg-white px-5 py-2.5
              font-semibold text-black
              shadow-[0px_5px_0px_0px_#FF931E]
              transition-all duration-150
              active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E] ${
                submitting || !canNext ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0px_4px_0px_0px_#FF931E]"
              }`}
            >
              {submitting && (
                <span className="inline-block w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin mr-2" />
              )}
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
