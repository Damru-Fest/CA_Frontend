import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { motion } from "motion/react";
export default function About() {
  useEffect(() => {
    AOS.init({
      // Optional: Add any initialization parameters here
    });
  }, []);
  return (
    <>
      <section
        id="about"
        className="relative z-30 px-4 md:px-10 py-16 md:py-24"
      >
        {/* Hands */}
        <img
          data-aos="fade-right"
          src="/images/lefthand.png"
          alt="Left hand"
          className="hidden md:block absolute left-0 -top-60 opacity-80 select-none pointer-events-none"
        />
        <img
          data-aos="fade-left"
          src="/images/Righthand.png"
          alt="Right hand"
          className="hidden md:block absolute right-0 bottom-[-40px] opacity-80 select-none pointer-events-none"
        />

        {/* Cards Row */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          data-aos="zoom-in"
          className="relative mx-auto  flex items-center justify-center gap-4 sm:gap-6 md:gap-10 "
        >
          <img
            src="/images/PhotoCards.png"
            alt="Event cards"
            className="object-contain"
          />
        </motion.div>

        {/* Description Panel */}
        <div className="relative mx-auto max-w-5xl">
          <div className=" text-white px-6 md:px-10 py-8 md:py-10 leading-relaxed ambassador-about-text">
            <p className="text-lg md:text-2xl text-center">
              The Damru Fest is an annual two-day cultural carnival hosted by
              Rishihood <br /> University in Delhi NCR. The 2024 edition ran on
              29th & 30th November featured live music, dance battles, <br />
              art installations, workshops and more — designed to draw both
              campus and off-campus crowds.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
