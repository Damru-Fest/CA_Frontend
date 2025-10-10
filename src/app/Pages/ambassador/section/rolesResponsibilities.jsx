
"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

 
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
 
const useGSAPAnimations = (containerRef, animationRefs) => {
  useEffect(() => {
    if (!containerRef.current) return;

 
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%", 
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });

      // Animate the main heading first
      tl.from(
        "#roles-heading",
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
          ease: "power3.out",
          duration: 1,
        },
        0  
      );
       
      const splashes = [
        animationRefs.leftSplash.current,
        animationRefs.leftSplash2.current,
        animationRefs.rightSplash.current,
        animationRefs.rightSplash2.current,
      ];

      tl.from(
        splashes,
        {
          x: (i) => (i < 2 ? "-110%" : "110%"),  
          opacity: 0,
          rotation: (i) => (i < 2 ? -20 : 20),
          scale: 0.8,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,  
        },
        "-=0.7"  
      );
 
      tl.from(
        ".responsibility-item",
        {
          opacity: 0,
          x: -30,  
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.8"  
      );
 
      gsap.to(animationRefs.circular.current, {
        rotation: 360,
        duration: 40,  
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
 
      gsap.to(animationRefs.circular.current, {
        scale: 1.05,
        duration: 5,
        repeat: -1,
        yoyo: true, 
        ease: "sine.inOut",
      });
      
    }, containerRef); 
 
    return () => ctx.revert();
  }, [containerRef, animationRefs]);
};

const RolesResponsibilities = () => {
  const containerRef = useRef(null);
  const leftSplashRef = useRef(null);
  const leftSplash2Ref = useRef(null);
  const rightSplashRef = useRef(null);
  const rightSplash2Ref = useRef(null);
  const circularRef = useRef(null);

  // Memoized image paths for performance
  const images = useMemo(
    () => ({
      centerImage: "/ambassdorAssets/flower.png",
      leftSplash: "/ambassdorAssets/rrleft.png",
      leftSplash2: "/ambassdorAssets/rrright.png",
      rightSplash: "/ambassdorAssets/rrright.png",
      rightSplash2: "/ambassdorAssets/rrleft.png",
      circularPath: "/ambassdorAssets/circular.png",
    }),
    []
  );
 
  const animationRefs = useMemo(
    () => ({
      leftSplash: leftSplashRef,
      leftSplash2: leftSplash2Ref,
      rightSplash: rightSplashRef,
      rightSplash2: rightSplash2Ref,
      circular: circularRef,
    }),
    []
  );

  // Apply the custom animation hook
  useGSAPAnimations(containerRef, animationRefs);

  return (
    <section
      id="roles"
      ref={containerRef}
      className="relative flex items-center justify-center w-full overflow-hidden min-h-screen py-20"
      aria-labelledby="roles-heading"
    >
      {/* Background circular pattern */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={images.circularPath}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          priority={false}
          quality={75}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left splashes with responsive height */}
        <div
          ref={leftSplashRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 h-[60%] md:h-[80%] lg:h-full"
        >
          <Image
            src={images.leftSplash}
            alt=""
            width={400}
            height={800}
            className="h-full w-auto object-contain"
            quality={60}
          />
        </div>
        <div
          ref={leftSplash2Ref}
          className="absolute top-[70%] -translate-y-1/2 left-0 h-[60%] md:h-[80%] lg:h-full"
        >
          <Image
            src={images.leftSplash2}
            alt=""
            width={400}
            height={800}
            className="h-full w-auto object-contain rotate-180"
            quality={60}
          />
        </div>

        {/* Right splashes with responsive height */}
        <div
          ref={rightSplash2Ref}
          className="absolute top-1/3 -translate-y-1/2 right-0 h-[50%] md:h-[70%] lg:h-[80%]"
        >
          <Image
            src={images.rightSplash2}
            alt=""
            width={400}
            height={640}
            className="h-full w-auto object-contain rotate-180"
            quality={60}
          />
        </div>
        <div
          ref={rightSplashRef}
          className="absolute top-0 right-0 h-[60%] md:h-[80%] lg:h-full"
        >
          <Image
            src={images.rightSplash}
            alt=""
            width={400}
            height={800}
            className="h-full w-auto object-contain"
            quality={60}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto text-center">
        <h1
          id="roles-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
        >
          Roles & Responsibilities
        </h1>

        {/* Responsibilities list */}
        <div className="max-w-3xl mx-auto p-6">
          <ul className="space-y-4 text-left text-gray-200 text-base sm:text-lg leading-relaxed">
            {/* Added a className to each <li> for easier targeting in GSAP */}
            <li className="responsibility-item flex items-start">
              <span className="text-[#FF931E] mr-3 mt-1 text-xl flex-shrink-0" aria-hidden="true">
                &#10022;
              </span>
              <span>
                Promote Damru-25 across the campus via social media, posters,
                and word of mouth.
              </span>
            </li>
            <li className="responsibility-item flex items-start">
              <span className="text-[#FF931E] mr-3 mt-1 text-xl flex-shrink-0" aria-hidden="true">
                &#10022;
              </span>
              <span>
                Drive registrations for competitions, workshops, and flagship
                events.
              </span>
            </li>
            <li className="responsibility-item flex items-start">
              <span className="text-[#FF931E] mr-3 mt-1 text-xl flex-shrink-0" aria-hidden="true">
                &#10022;
              </span>
              <span>
                Serve as the first point of contact for student queries
                regarding events or registrations.
              </span>
            </li>
            <li className="responsibility-item flex items-start">
              <span className="text-[#FF931E] mr-3 mt-1 text-xl flex-shrink-0" aria-hidden="true">
                &#10022;
              </span>
              <span>
                Organize mini pre-fest activities like info sessions or campus
                contests.
              </span>
            </li>
            <li className="responsibility-item flex items-start">
              <span className="text-[#FF931E] mr-3 mt-1 text-xl flex-shrink-0" aria-hidden="true">
                &#10022;
              </span>
              <span>
                Create and share digital content (reels, memes, posters) to
                boost engagement.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Center decorative image */}
      <div ref={circularRef} className="absolute pointer-events-none">
        <Image
          src={images.centerImage}
          alt=""
          width={500}
          height={500}
          className="opacity-80 w-[250px] sm:w-[400px] md:w-[500px] h-auto"
          quality={75}
        />
      </div>
    </section>
  );
};

export default RolesResponsibilities;