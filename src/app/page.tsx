"use client";
import AmbassadorPage from "./Pages/ambassador/page";
import { useEffect, useState, useRef } from "react";
import Landing from "../components/landing";
import gsap from "gsap";

export default function Home() {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);
  const [showLanding, setShowLanding] = useState(false);
  const [showAmbassador, setShowAmbassador] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const landingRef = useRef(null);
  const ambassadorRef = useRef(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true");
      setIsFirstVisit(true);
      setShowLanding(true);
    } else {
      setIsFirstVisit(false);
      setShowAmbassador(true);
    }
  }, []);

  useEffect(() => {
    if (landingRef.current && ambassadorRef.current) {
      gsap.set(ambassadorRef.current, { opacity: showAmbassador ? 1 : 0 });
      gsap.set(landingRef.current, { opacity: 1 });
    }
  }, [showAmbassador]);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);

    const tl = gsap.timeline();

    tl.to({}, { duration: 0.8 });

    tl.to(landingRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    tl.to(
      ambassadorRef.current,
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          setShowLanding(false);
          setShowAmbassador(true);
        },
      },
      "-=0.3"
    );
  };

  // Loading state
  if (isFirstVisit === null) {
    return <div className="w-full h-screen bg-black"></div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Landing Animation */}
      {(showLanding || (isFirstVisit && !animationComplete)) && (
        <div ref={landingRef} className="absolute inset-0 z-30 opacity-100">
          <Landing onAnimationComplete={handleAnimationComplete} />
        </div>
      )}

      {/* Ambassador Page */}
      <div
        ref={ambassadorRef}
        className={`absolute inset-0 z-20 ${
          showAmbassador ? "opacity-100" : "opacity-0"
        }`}
      >
        <AmbassadorPage />
      </div>
    </div>
  );
}
