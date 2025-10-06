"use client";

import { redirect } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

import React from "react";
import { motion } from "framer-motion";
import ActionButton from "@/components/ActionButton";
export default function Home() {
  const bgImageUrl = "/ambassdorAssets/cabghome.png";
  const decorativeOverlayUrl = "/ambassdorAssets/decorative.png";
  const googleUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;

  const { user, loading } = useAuth();
  useEffect(() => {
    if (user) {
      redirect("/Pages/ambassador");
    }
  }, [user]);

  const handleGoogle = () => {
    return redirect(googleUrl);
  };
  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat text-white p-4"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
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

        <main className="relative z-30 flex flex-col items-center text-center space-y-2 md:space-y-4">
          <div className="relative w-96 h-60 overflow-hidden"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
          >
            <button
              className="inline-flex items-center justify-center
              h-10 w-[137px]
              gap-2.5 rounded-[30px]
              bg-white px-5 py-2.5
              font-semibold text-black
              shadow-[0px_5px_0px_0px_#FF931E]
              transition-all duration-150
              hover:shadow-[0px_4px_0px_0px_#FF931E]
              active:translate-y-1 active:shadow-[0px_2px_0px_0px_#FF931E]"
              onClick={handleGoogle}
            >
              Log in
            </button>
          </motion.div>
        </main>
      </div>
    </>
  );
}
