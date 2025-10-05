import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function Rules() {
  useEffect(() => {
    AOS.init({
      // Optional: Add any initialization parameters here
    });
  }, []);
  return (
    <section id="rules">
      <div
        className="flex flex-row justify-center items-center"
        style={{
          backgroundImage: "url('/images/union.png')",
          width: "100%",
          height: "70vh",
        }}
      >
        <div className="relative" style={{ width: "100%" }}>
          <img
            data-aos="fade-right"
            className="absolute md:left-0  -left-20 -top-70"
            src="/images/Left-Patch-2.png"
            alt=""
          />
          <img
            data-aos="fade-right"
            className="absolute   md:left-0 -left-20 -top-90"
            style={{ marginRight: "auto" }}
            src="/images/RightPatch.png"
            alt=""
          />

          <img
            data-aos="fade-left"
            className="absolute  m:right-0 -right-30 -top-80 m:w-auto "
            src="/images/RightPatch-2.png"
            alt=""
          />
          <img
            data-aos="fade-left"
            className="absolute m:right-0 -right-20 -top-70"
            style={{ marginLeft: "auto" }}
            src="/images/LeftPatch.png"
            alt=""
          />
        </div>
        <img
          className="absolute md:w-auto w-50 spinner"
          src="/images/Graphic_Elements.png"
          alt=""
        ></img>

        <div className="absolute  self-start mt-30">
          <h1
            className="text-white font-bold text-2xl md:text-5xl align-top"
            style={{ fontFamily: "Kamal", marginBottom: "auto" }}
          >
            Rules & Responsibilities
          </h1>
        </div>
      </div>
    </section>
  );
}
