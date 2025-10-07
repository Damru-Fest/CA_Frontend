"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import FormInfo from "./FormInfo";
export default function FormPage() {
  const [showForm, setShowForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const { user, loading, setLoading, caSubmit, app } = useAuth();

  useEffect(() => {
    if (user) {
      console.log(app);
      if (app) {
        setApplicationSubmitted(true);
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    } else {
      setShowForm(false);
    }
  }, [user, app]);

  const handleGoogleSignIn = () => {
    setLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const [submittingForm, setSubmittingForm] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {
    setSubmittingForm(true);
    setError(null);

    try {
      const success = await caSubmit(formData);
      if (success) {
        setApplicationSubmitted(true);
        setShowForm(false);
      } else {
        setError("Failed to submit application. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while submitting your application.");
      console.error("Form submission error:", err);
    } finally {
      setSubmittingForm(false);
    }
  };

  return (
    <div
      className="flex flex-col z-20  border-amber-600 border-2 rounded-lg py-5 px-10 h-fit  justify-center  md:w-140 w-100"
      style={{ backgroundColor: "rgba(0,0,0)" }}
    >
      <h1 className="text-center font-bold md:text-4xl text-2xl mb-5 ">
        {applicationSubmitted ? "Application Received" : "Register for CA"}
      </h1>

      {applicationSubmitted && (
        <div className="flex flex-col items-center text-center py-8">
          <p className="text-gray-300 mb-4 leading-relaxed">
            We have received your Campus Ambassador application and it is now
            under review.
          </p>
          <p className="text-gray-400 text-sm">
            Our team will get back to you within 3-5 business days with an
            update on your application status.
          </p>
        </div>
      )}

      {!showForm && !applicationSubmitted && (
        <div className="flex flex-col items-center">
          <button
            onClick={handleGoogleSignIn}
            className="text-center bg-white text-black mb-5 md:w-100 w-50 rounded-4xl p-2 self-center flex items-center justify-center gap-3 transition-opacity duration-200"
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
            aria-live="polite"
            aria-busy={loading}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin mr-2" />
                <span>Connecting with Google...</span>
              </>
            ) : (
              <span>Sign Up with Google</span>
            )}
          </button>

          <p className="text-center mb-7 text-sm text-gray-300">
            By clicking Sign Up with Google, you agree to the{" "}
            <br className="md:hidden" />
            <a
              href="#"
              className="text-white underline hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and acknowledge our{" "}
            <a
              href="#"
              className="text-white underline hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      )}

      {!applicationSubmitted && <hr className="mb-5" />}

      {/* Error display */}
      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {/* Conditionally render the real form only after OAuth success and no existing application */}
      {showForm && !applicationSubmitted && (
        <FormInfo onSubmit={handleFormSubmit} submitting={submittingForm} />
      )}
    </div>
  );
}
