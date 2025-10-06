"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
export default function FormInfo({ onSubmit }) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
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

    setSubmitting(true);
    // simulate network
    await new Promise((r) => setTimeout(r, 800));
    console.log("Collected form data:", data);
    setSubmitting(false);
    if (onSubmit) onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="relative min-h-[320px]">
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
            <label className="mb-2">College</label>
            <input
              name="college"
              value={data.college}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E]"
            />

            <label className="mb-2">Year</label>
            <input
              name="yearOfStudy"
              value={data.yearOfStudy}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E]"
            />

            <label className="mb-2">Stream</label>
            <input
              name="stream"
              value={data.stream}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E]"
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
            <label className="mb-2">LinkedIn</label>
            <input
              name="linkedin"
              value={data.linkedinUrl}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E]"
            />

            <label className="mb-2">Instagram</label>
            <input
              name="instagram"
              value={data.instagramUrl}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E]"
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
            <label className="mb-2">
              Previous ambassador / leadership experience
            </label>
            <textarea
              name="previousExperience"
              value={data.previousExperience}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E]"
              rows={5}
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
            <label className="mb-2">
              why do you want to be a Campus Ambassador?
            </label>
            <textarea
              name="whyAmbassador"
              value={data.whyAmbassador}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E]"
              rows={6}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-4">
        <div>
          {step < 4 && (
            <button
              type="button"
              onClick={back}
              className={`inline-flex items-center justify-center
              h-10 w-[137px]
              gap-2.5 rounded-[30px]
              bg-black px-5 py-2.5
              font-semibold text-white
              border-2 border-[#FF931E]
              transition-all duration-150
              shadow-[0px_3px_0px_0px_#FF931E]
              active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E] ${
                step === 0 ? "opacity-50 cursor-not-allowed" : null
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
              aria-disabled={!canNext}
              className={`inline-flex items-center justify-center
              h-10 w-[137px]
              gap-2.5 rounded-[30px]
              bg-white px-5 py-2.5
              font-semibold text-black
              shadow-[0px_5px_0px_0px_#FF931E]
              transition-all duration-150
              hover:shadow-[0px_4px_0px_0px_#FF931E]
              active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E] ${
                !canNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !canNext}
              className={`inline-flex items-center justify-center
              h-10 w-[137px]
              gap-2.5 rounded-[30px]
              bg-white px-5 py-2.5
              font-semibold text-black
              shadow-[0px_5px_0px_0px_#FF931E]
              transition-all duration-150
              hover:shadow-[0px_4px_0px_0px_#FF931E]
              active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E] ${
                !canNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? (
                <span className="inline-block w-4 h-4 border-2 border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
