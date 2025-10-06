import React from "react";
import Navbar from "../../../components/caNav";
import Home from "../ambassador/section/home";
import FestivalCard from "../ambassador/section/festivalCard";
import RolesAndResponsibilities from "../ambassador/section/rolesResponsibilities";
import Benefits from "../ambassador/section/benefits";
import RegisterBanner from "./section/registerBanner";
import CaFooter from "../../../components/caFooter";

const page = () => {
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
