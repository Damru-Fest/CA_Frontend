"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Login() {
  const bgImageUrl = "/ambassdorAssets/cabghome.png";
  const decorativeOverlayUrl = "/ambassdorAssets/decorative.png";
  const logoUrl = "/ambassdorAssets/logo.png";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error(
          "API URL is not configured. Please check your environment variables."
        );
      }
      const currentUrl = window.location.href;
      const redirectParam = encodeURIComponent(currentUrl);

      const googleUrl = `${apiUrl}/auth/google?redirect=${redirectParam}`;

      window.location.href = googleUrl;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login"
      );
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat text-white p-4 overflow-hidden"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <motion.img
        src={decorativeOverlayUrl}
        alt="Decorative element"
        className="absolute -top-40 -rotate-2 left-0 w-full h-auto"
        style={{ opacity: 0.6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-black opacity-80 z-20"></div>
      <main className="relative z-30 flex flex-col items-center text-center space-y-6 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src={logoUrl}
            alt="Damru Festival Logo"
            className="w-48 h-auto md:w-64"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Welcome to Damru'25
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Sign in to access your Campus Ambassador dashboard
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500 rounded-lg p-4 max-w-md"
          >
            <p className="text-red-200 text-sm">{error}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          className="mt-8"
        >
          <button
            className="inline-flex items-center justify-center h-12 w-fit gap-3 rounded-[30px] bg-white px-8 py-3 font-semibold text-black shadow-[0px_5px_0px_0px_#FF931E] transition-all duration-150 hover:shadow-[0px_4px_0px_0px_#FF931E] active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGoogle}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                Signing in...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
