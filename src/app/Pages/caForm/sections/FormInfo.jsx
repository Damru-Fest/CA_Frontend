"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    if (step === 3) return safeTrim(data.whyAmbassador).length > 10;
    return false;
  }, [step, data]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
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
    e.preventDefault();
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
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="mr-2 px-4 py-2 border rounded"
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
              className={`px-4 py-2 bg-white text-black rounded ${
                !canNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-white text-black rounded flex items-center"
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
