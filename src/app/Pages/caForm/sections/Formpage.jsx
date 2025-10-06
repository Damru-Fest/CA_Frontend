"use client";

import { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
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
    redirect(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`);
  };

  const [collectedData, setCollectedData] = useState(null);
  const [submittingForm, setSubmittingForm] = useState(false);

  const handleFormSubmit = async (formData) => {
    setSubmittingForm(true);

    const success = await caSubmit(formData);
    if (success) {
      setApplicationSubmitted(true);
      setShowForm(false);
    }
    setCollectedData(formData);
    console.log("Final collected data:", formData);
    setSubmittingForm(false);
  };

  return (
    <div
      className="flex flex-col z-20  border-amber-600 border-2 rounded-lg py-5 px-10 h-fit  justify-center  md:w-140 w-100"
      style={{ backgroundColor: "rgba(0,0,0)" }}
    >
      <h1 className="text-center font-bold md:text-4xl text-2xl mb-5 ">
        {applicationSubmitted ? "Application Received" : "Register for CA"}
      </h1>

      {applicationSubmitted ? (
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
      ) : !showForm ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleGoogleSignIn}
            className="text-center bg-white text-black mb-5 md:w-100 w-50 rounded-4xl p-2 self-center flex items-center justify-center gap-3"
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
            aria-live="polite"
            aria-busy={loading}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-t-transparent rounded-full animate-spin mr-2" />
                <span>Connecting with google...</span>
              </>
            ) : (
              <span> Sign Up with Google</span>
            )}
          </button>

          <p className="text-center mb-7" style={{ fontSize: "15px" }}>
            By clicking Sign Up with Google, You agree to the <br />
            <a
              href="#"
              className="text-white"
              style={{ textDecoration: "Underline" }}
            >
              Terms of Service
            </a>{" "}
            and acknowledge{" "}
            <a
              href="#"
              className="text-white"
              style={{ textDecoration: "Underline" }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      ) : null}

      {!applicationSubmitted && <hr className="mb-5" />}

      {/* Conditionally render the real form only after OAuth success and no existing application */}
      {showForm && !applicationSubmitted ? (
        <FormInfo onSubmit={handleFormSubmit} />
      ) : null}
    </div>
  );
}
