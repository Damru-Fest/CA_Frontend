"use client";
import CaNav from "../../../components/caNav";
import Home from "./sections/Home";
import Formpage from "./sections/Formpage";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Loading from "../../../components/loading";
export default function Form() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  
  useEffect(() => {
    // Only redirect if we're not loading and user is not authenticated
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loading />
        </div>
      </div>
    );
  }

  // Don't render the page if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <div className="absolute top-5 left-6 sm:left-10 z-[100]">
        <Link href="/">
          <Image
            src="/ambassdorAssets/logo.png"
            alt="Damru Logo"
            width={0} // let Tailwind handle sizing
            height={0}
            sizes="100vw"
            className="w-24 sm:w-32 md:w-40   lg:w-30 h-auto"
            priority
          />
        </Link>
      </div>

      <div className="flex-1 flex flex-row justify-center items-center gap-10 text-white pt-20 max-h-[80%]">
        <Home />
        <Formpage />
      </div>
    </div>
  );
}
