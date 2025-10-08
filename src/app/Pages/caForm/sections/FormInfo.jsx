"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function FormInfo({ onSubmit, submitting = false }) {
  const [step, setStep] = useState(0);
  const [attemptedNext, setAttemptedNext] = useState(false);
  const [data, setData] = useState({
    college: "",
    yearOfStudy: "",
    stream: "",
    linkedinUrl: "",
    instagramUrl: "",
    phoneNumber: "",
    previousExperience: "",
    whyAmbassador: "",
  });

  const safeTrim = (v) => (typeof v === "string" ? v.trim() : "");

  // --- Validation utilities ---
  const isValidUrl = (url, type) => {
    if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(url)) return false;
    if (type === "linkedin")
      return url.includes("linkedin.com/in") || url.includes("linkedin.com/");
    if (type === "instagram")
      return url.includes("instagram.com/") || url.includes("instagr.am/");
    return true;
  };

  const isValidPhone = (num) => {
    const cleaned = num.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  // --- Required fields for each step ---
  const requiredFields = {
    0: ["college", "yearOfStudy", "stream"],
    1: ["linkedinUrl", "instagramUrl", "phoneNumber"],
    2: ["previousExperience"],
    3: ["whyAmbassador"],
  };

  // --- Step validation ---
  const isCurrentStepValid = useMemo(() => {
    const required = requiredFields[step] || [];
    return required.every((field) => {
      const value = safeTrim(data[field]);
      if (!value) return false;
      if (field === "linkedinUrl") return isValidUrl(value, "linkedin");
      if (field === "instagramUrl") return isValidUrl(value, "instagram");
      if (field === "phoneNumber") return isValidPhone(value);
      return true;
    });
  }, [step, data]);

  // --- Field error helper ---
  const errors = {
    college: "College",
    yearOfStudy: "Year of study",
    stream: "Stream",
    linkedinUrl: "LinkedIn",
    instagramUrl: "Instagram",
    phoneNumber: "Phone number",
    previousExperience: "Previous experience",
    whyAmbassador: "Why you want to be a ambassador",
  };
  const getFieldError = (fieldName) => {
    const required = requiredFields[step] || [];
    if (!required.includes(fieldName) || !attemptedNext) return null;

    const value = safeTrim(data[fieldName]);
    if (!value) return `${errors[fieldName]} is required`;

    if (fieldName === "linkedinUrl" && !isValidUrl(value, "linkedin"))
      return "Enter a valid LinkedIn URL";
    if (fieldName === "instagramUrl" && !isValidUrl(value, "instagram"))
      return "Enter a valid Instagram URL";
    if (fieldName === "phoneNumber" && !isValidPhone(value))
      return "Enter a valid phone number (10 digits)";

    return null;
  };

  // --- Framer motion variants ---
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 10 : -10, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 10 : -10, opacity: 0 }),
  };

  // --- Navigation handlers ---
  const next = () => {
    setAttemptedNext(true);
    if (!isCurrentStepValid) {
      const required = requiredFields[step] || [];
      const firstInvalid = required.find(
        (field) =>
          !safeTrim(data[field]) ||
          (field === "linkedinUrl" && !isValidUrl(data[field], "linkedin")) ||
          (field === "instagramUrl" && !isValidUrl(data[field], "instagram")) ||
          (field === "phoneNumber" && !isValidPhone(data[field]))
      );
      if (firstInvalid) {
        const el = document.querySelector(`[name="${firstInvalid}"]`);
        if (el) el.focus();
      }
      return;
    }
    if (step < 3) {
      setStep((s) => s + 1);
      setAttemptedNext(false);
    }
  };

  const back = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      setAttemptedNext(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setAttemptedNext(true);
    if (step !== 3 || submitting || !isCurrentStepValid) return;
    if (onSubmit) onSubmit(data);
  };

  // --- JSX ---
  return (
    <form onSubmit={handleSubmit} className="relative min-h-[320px]">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">Step {step + 1} of 4</span>
          <span className="text-sm text-gray-400">
            {Math.round(((step + 1) / 4) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-amber-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence initial={false} custom={1} mode="wait">
        {/* STEP 0 */}
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
            {/* college */}
            <label className="mb-2" htmlFor="college">
              College
            </label>
            <input
              id="college"
              name="college"
              type="text"
              value={data.college}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
              placeholder="Enter your college name"
            />
            <div className="h-6 mb-1">
              {getFieldError("college") && (
                <p className="text-red-400 text-sm">
                  {getFieldError("college")}
                </p>
              )}
            </div>

            {/* year */}
            <label className="mb-2" htmlFor="yearOfStudy">
              Year of Study
            </label>
            <select
              id="yearOfStudy"
              name="yearOfStudy"
              value={data.yearOfStudy}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="" disabled>
                Select your year of study
              </option>
              {["UG 1", "UG 2", "UG 3", "UG 4", "UG 5", "PG 1", "PG 2"].map(
                (y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                )
              )}
            </select>
            <div className="h-6 mb-1">
              {getFieldError("yearOfStudy") && (
                <p className="text-red-400 text-sm">
                  {getFieldError("yearOfStudy")}
                </p>
              )}
            </div>

            {/* stream */}
            <label className="mb-2" htmlFor="college">
              Stream
            </label>
            <input
              id="stream"
              name="stream"
              type="text"
              value={data.stream}
              onChange={handleChange}
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
              placeholder="Enter your stream name"
            />
            <div className="h-6 mb-1">
              {getFieldError("stream") && (
                <p className="text-red-400 text-sm">
                  {getFieldError("stream")}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* STEP 1 */}
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
            <label className="mb-2" htmlFor="linkedinUrl">
              LinkedIn Profile
            </label>
            <input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              value={data.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/your-profile"
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
            />
            <div className="h-6 mb-1">
              {getFieldError("linkedinUrl") && (
                <p className="text-red-400 text-sm">
                  {getFieldError("linkedinUrl")}
                </p>
              )}
            </div>

            <label className="mb-2" htmlFor="instagramUrl">
              Instagram Profile
            </label>
            <input
              id="instagramUrl"
              name="instagramUrl"
              type="url"
              value={data.instagramUrl}
              onChange={handleChange}
              placeholder="https://instagram.com/your-username"
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
            />
            <div className="h-6 mb-1">
              {getFieldError("instagramUrl") && (
                <p className="text-red-400 text-sm">
                  {getFieldError("instagramUrl")}
                </p>
              )}
            </div>

            <label className="mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={data.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
            />
            <div className="h-6 mb-1">
              {getFieldError("phoneNumber") && (
                <p className="text-red-400 text-sm">
                  {getFieldError("phoneNumber")}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
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
              rows={5}
              placeholder="Tell us about any previous ambassador roles, leadership positions, or relevant experience..."
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none resize-vertical"
            />
            <div className="h-6 mb-1">
              {getFieldError("previousExperience") && (
                <p className="text-red-400 text-sm">
                  {getFieldError("previousExperience")}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
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
              Why do you want to be a Campus Ambassador?
            </label>
            <textarea
              id="whyAmbassador"
              name="whyAmbassador"
              value={data.whyAmbassador}
              onChange={handleChange}
              rows={6}
              placeholder="Share your motivation and what you hope to achieve as a Campus Ambassador..."
              className="border-2 border-gray-500 p-3 rounded-2xl mb-3 bg-[#1E1E1E] text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none resize-vertical"
            />
            <div className="h-6 mb-1">
              {getFieldError("whyAmbassador") && (
                <p className="text-red-400 text-sm">
                  {getFieldError("whyAmbassador")}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className={`inline-flex items-center justify-center
          h-10 w-[137px] rounded-[30px]
          bg-black text-white border-2 border-[#FF931E]
          transition-all duration-150
          shadow-[0px_3px_0px_0px_#FF931E]
          ${
            step === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-[0px_4px_0px_0px_#FF931E]"
          }`}
        >
          Back
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center justify-center
            h-10 w-[137px] rounded-[30px]
            bg-white text-black font-semibold
            shadow-[0px_5px_0px_0px_#FF931E]
            transition-all duration-150 hover:shadow-[0px_4px_0px_0px_#FF931E]
            active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E]"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className={`inline-flex items-center justify-center
            h-10 w-[137px] rounded-[30px]
            bg-white text-black font-semibold
            shadow-[0px_5px_0px_0px_#FF931E]
            transition-all duration-150
            ${
              submitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-[0px_4px_0px_0px_#FF931E] active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E]"
            }`}
          >
            {submitting && (
              <span className="inline-block w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin mr-2" />
            )}
            {submitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </form>
  );
}
