"use client";
import CaNav from "../../../components/caNav";
import Home from "./sections/Home";
import Formpage from "./sections/Formpage";
export default function Form() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <CaNav />
      <div className="flex-1 flex flex-row justify-center items-center gap-10 text-white pt-20 h-max-[80%]">
        <Home></Home>

        <Formpage></Formpage>
      </div>
    </div>
  );
}
