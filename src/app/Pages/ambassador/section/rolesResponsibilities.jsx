// import React from "react";

// const RolesResponsibilities = () => {
//     const centerImage = "/ambassdorAssets/flower.png";
//     const leftSplash = "/ambassdorAssets/rrleft.png";
//     const leftSplash2 = "/ambassdorAssets/rrright.png";
//     const rightSplash = "/ambassdorAssets/rrright.png";
//     const rightSplash2 = "/ambassdorAssets/rrleft.png";
//     const circularPath = "/ambassdorAssets/circular.png";

//     return (
//         <div
//             className="relative flex items-center justify-center w-full overflow-hidden h-[500px] sm:h-[600px] md:h-screen"
//             style={{
//                 backgroundImage: `url(${circularPath})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "bottom left",
//                 backgroundRepeat: "no-repeat",
//             }}
//         >
//             <img
//                 src={leftSplash}
//                 alt="Left Splash"
//                 className="absolute top-1/2 -translate-y-1/2 left-0 h-full object-contain"
//             />

//             <img
//                 src={leftSplash2}
//                 alt="left Splash2"
//                 className="absolute top-[70%] -translate-y-1/2 left-0 h-full rotate-180 object-contain"
//             />

//             <img
//                 src={rightSplash2}
//                 alt="Left Splash"
//                 className="absolute top-1/3 -translate-y-1/2 right-0 rotate-180 h-[80%] object-contain"
//             />
//             <img
//                 src={rightSplash}
//                 alt="Right Splash"
//                 className="absolute top-0 right-0 h-full object-contain"
//             />

//             <div className="relative text-center z-10 px-4">
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
//                     Roles & Responsibilities
//                 </h1>
//             </div>

//             <img
//                 src={centerImage}
//                 alt="Mandala"
//                 className="absolute opacity-80 w-[250px] sm:w-[400px] md:w-[500px]"
//             />
//         </div>
//     );
// };

// export default RolesResponsibilities;

// "use client";

// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const RolesResponsibilities = () => {
//   const containerRef = useRef(null);
//   const leftSplashRef = useRef(null);
//   const leftSplash2Ref = useRef(null);
//   const rightSplashRef = useRef(null);
//   const rightSplash2Ref = useRef(null);
//   const circularRef = useRef(null);

//   const centerImage = "/ambassdorAssets/flower.png";
//   const leftSplash = "/ambassdorAssets/rrleft.png";
//   const leftSplash2 = "/ambassdorAssets/rrright.png";
//   const rightSplash = "/ambassdorAssets/rrright.png";
//   const rightSplash2 = "/ambassdorAssets/rrleft.png";
//   const circularPath = "/ambassdorAssets/circular.png";

//   useEffect(() => {
//      gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: "top 40%",
//         end: "bottom top",
//         toggleActions: "play reverse play reverse",
//       },
//     })
//       .from(leftSplashRef.current, { x: "-100%", opacity: 0, duration: 1.2, ease: "power3.out" })
//       .from(leftSplash2Ref.current, { x: "-100%", opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1")
//       .from(rightSplashRef.current, { x: "100%", opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1")
//       .from(rightSplash2Ref.current, { x: "100%", opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1");

//     gsap.to(circularRef.current, {
//       rotation: 360,
//       duration: 20,
//       repeat: -1,
//       ease: "linear",
//     });
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="relative flex items-center justify-center w-full overflow-hidden h-[500px] sm:h-[600px] md:h-screen"
//     >

//       <img

//         src={circularPath}
//         alt="Circular Path"
//         className="absolute bottom-0 left-0 w-full h-full object-cover"
//       />

//       {/* Left splashes */}
//       <img
//         ref={leftSplashRef}
//         src={leftSplash}
//         alt="Left Splash"
//         className="absolute top-1/2 -translate-y-1/2 left-0 h-full object-contain"
//       />
//       <img
//         ref={leftSplash2Ref}
//         src={leftSplash2}
//         alt="Left Splash2"
//         className="absolute top-[70%] -translate-y-1/2 left-0 h-full rotate-180 object-contain"
//       />

//       {/* Right splashes */}
//       <img
//         ref={rightSplash2Ref}
//         src={rightSplash2}
//         alt="Right Splash2"
//         className="absolute top-1/3 -translate-y-1/2 right-0 rotate-180 h-[80%] object-contain"
//       />
//       <img
//         ref={rightSplashRef}
//         src={rightSplash}
//         alt="Right Splash"
//         className="absolute top-0 right-0 h-full object-contain"
//       />

//       <div className="relative text-center z-10 px-4">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
//           Roles & Responsibilities
//         </h1>
//       </div>

//       <img
//         ref={circularRef}
//         src={centerImage}
//         alt="Mandala"
//         className="absolute opacity-80 w-[250px] sm:w-[400px] md:w-[500px]"
//       />
//     </div>
//   );
// };

// export default RolesResponsibilities;

"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom hook for GSAP animations
const useGSAPAnimations = (containerRef, textContainerRef, animationRefs) => {
  const timelineRef = useRef(null);
  const rotationTweenRef = useRef(null);

  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    if (rotationTweenRef.current) {
      rotationTweenRef.current.kill();
      rotationTweenRef.current = null;
    }
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === containerRef.current) {
        trigger.kill();
      }
    });
  }, [containerRef]);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      try {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        });

        // Animate splash elements
        Object.values(animationRefs).forEach((ref, index) => {
          if (ref.current) {
            const isLeft = index < 2;
            tl.from(
              ref.current,
              {
                x: isLeft ? "-120%" : "120%",
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
              },
              index === 0 ? 0 : "-=1"
            );
          }
        });

        // Animate text content
        if (textContainerRef.current?.children) {
          tl.from(
            Array.from(textContainerRef.current.children),
            {
              opacity: 0,
              y: 30,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }

        timelineRef.current = tl;

        // Continuous rotation animation
        if (animationRefs.circular?.current) {
          rotationTweenRef.current = gsap.to(animationRefs.circular.current, {
            rotation: 360,
            duration: 30,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center",
          });
        }
      } catch (error) {
        console.error("GSAP animation error:", error);
      }
    }, containerRef);

    return () => {
      cleanup();
      ctx.revert();
    };
  }, [containerRef, textContainerRef, animationRefs, cleanup]);

  return cleanup;
};

const RolesResponsibilities = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const leftSplashRef = useRef(null);
  const leftSplash2Ref = useRef(null);
  const rightSplashRef = useRef(null);
  const rightSplash2Ref = useRef(null);
  const circularRef = useRef(null);

  // Memoized image paths for better performance
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

  // Memoized animation refs
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

  // Use custom hook for animations
  useGSAPAnimations(containerRef, textContainerRef, animationRefs);

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
        {/* Left splashes */}
        <div
          ref={leftSplashRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 h-full"
        >
          <Image
            src={images.leftSplash}
            alt=""
            width={400}
            height={800}
            className="h-full w-auto object-contain"
            priority={false}
            quality={60}
          />
        </div>
        <div
          ref={leftSplash2Ref}
          className="absolute top-[70%] -translate-y-1/2 left-0 h-full"
        >
          <Image
            src={images.leftSplash2}
            alt=""
            width={400}
            height={800}
            className="h-full w-auto object-contain rotate-180"
            priority={false}
            quality={60}
          />
        </div>

        {/* Right splashes */}
        <div
          ref={rightSplash2Ref}
          className="absolute top-1/3 -translate-y-1/2 right-0 h-[80%]"
        >
          <Image
            src={images.rightSplash2}
            alt=""
            width={400}
            height={640}
            className="h-full w-auto object-contain rotate-180"
            priority={false}
            quality={60}
          />
        </div>
        <div ref={rightSplashRef} className="absolute top-0 right-0 h-full">
          <Image
            src={images.rightSplash}
            alt=""
            width={400}
            height={800}
            className="h-full w-auto object-contain"
            priority={false}
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
        <div ref={textContainerRef} className="max-w-3xl mx-auto p-6">
          <ul className="space-y-4 text-left text-gray-200 text-base sm:text-lg leading-relaxed">
            <li className="flex items-start">
              <span
                className="text-[#FF931E] mr-3 mt-1 text-xl flex-shrink-0"
                aria-hidden="true"
              >
                &#10022;
              </span>
              <span>
                Promote Damru-25 across the campus via social media, posters,
                and word of mouth.
              </span>
            </li>
            <li className="flex items-start">
              <span
                className="text-[#FF931E] mr-3 mt-1 text-xl flex-shrink-0"
                aria-hidden="true"
              >
                &#10022;
              </span>
              <span>
                Drive registrations for competitions, workshops, and flagship
                events.
              </span>
            </li>
            <li className="flex items-start">
              <span
                className="text-[#FF931E] mr-3 mt-1 text-xl flex-shrink-0"
                aria-hidden="true"
              >
                &#10022;
              </span>
              <span>
                Serve as the first point of contact for student queries
                regarding events or registrations.
              </span>
            </li>
            <li className="flex items-start">
              <span
                className="text-[#FF931E] mr-3 mt-1 text-xl flex-shrink-0"
                aria-hidden="true"
              >
                &#10022;
              </span>
              <span>
                Organize mini pre-fest activities like info sessions or campus
                contests.
              </span>
            </li>
            <li className="flex items-start">
              <span
                className="text-[#FF931E] mr-3 mt-1 text-xl flex-shrink-0"
                aria-hidden="true"
              >
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
          priority={false}
          quality={75}
        />
      </div>
    </section>
  );
};

export default RolesResponsibilities;
