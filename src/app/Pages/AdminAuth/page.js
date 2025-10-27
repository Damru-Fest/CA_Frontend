"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
const AdminAuth = () => {
  const { user, loading, setLoading } = useAuth();
  const router = useRouter();
  const handleGoogleSignIn = () => {
    setLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  useEffect(() => {
    async function checkAdmin() {
      if (user) {
        // stop loading
        setLoading(false);
        // if the signed-in user is an admin, redirect to admin page
        if (user.role === "ADMIN") {
          router.push("/Pages/Admin");
        } else {
          // non-admin users should not stay on this page; send them home
          router.push("/");
        }
      }
    }
    checkAdmin();
  }, [user]);

  return (
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
    </div>
  );
};

export default AdminAuth;
