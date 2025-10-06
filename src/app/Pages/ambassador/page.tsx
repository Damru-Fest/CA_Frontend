"use client";
import React from "react";
import Navbar from "../../../components/caNav";
import Home from "../ambassador/section/home";
import FestivalCard from "../ambassador/section/festivalCard";
import RolesAndResponsibilities from "../ambassador/section/rolesResponsibilities";
import Benefits from "../ambassador/section/benefits";
import RegisterBanner from "../ambassador/section/registerBanner";
import CaFooter from "../../../components/caFooter";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../../components/loading";
const page = () => {
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
    <div className="bg-black overflow-x-hidden text-white min-h-screen">
      <Navbar />
      <Home />
      <FestivalCard />
      <RolesAndResponsibilities />
      <Benefits />
      <RegisterBanner />
      <CaFooter />
    </div>
  );
};

export default page;
