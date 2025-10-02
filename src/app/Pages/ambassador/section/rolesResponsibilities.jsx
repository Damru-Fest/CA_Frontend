 
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

"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RolesResponsibilities = () => {
  const containerRef = useRef(null);
  const leftSplashRef = useRef(null);
  const leftSplash2Ref = useRef(null);
  const rightSplashRef = useRef(null);
  const rightSplash2Ref = useRef(null);
  const circularRef = useRef(null);

  const centerImage = "/ambassdorAssets/flower.png";
  const leftSplash = "/ambassdorAssets/rrleft.png";
  const leftSplash2 = "/ambassdorAssets/rrright.png";
  const rightSplash = "/ambassdorAssets/rrright.png";
  const rightSplash2 = "/ambassdorAssets/rrleft.png";
  const circularPath = "/ambassdorAssets/circular.png";

  useEffect(() => {
     gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 40%", 
        end: "bottom top", 
        toggleActions: "play reverse play reverse", 
      },
    })
      .from(leftSplashRef.current, { x: "-100%", opacity: 0, duration: 1.2, ease: "power3.out" })
      .from(leftSplash2Ref.current, { x: "-100%", opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1")
      .from(rightSplashRef.current, { x: "100%", opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1")
      .from(rightSplash2Ref.current, { x: "100%", opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1");

    
    gsap.to(circularRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full overflow-hidden h-[500px] sm:h-[600px] md:h-screen"
    >
     
      <img
      
        src={circularPath}
        alt="Circular Path"
        className="absolute bottom-0 left-0 w-full h-full object-cover"
      />

      {/* Left splashes */}
      <img
        ref={leftSplashRef}
        src={leftSplash}
        alt="Left Splash"
        className="absolute top-1/2 -translate-y-1/2 left-0 h-full object-contain"
      />
      <img
        ref={leftSplash2Ref}
        src={leftSplash2}
        alt="Left Splash2"
        className="absolute top-[70%] -translate-y-1/2 left-0 h-full rotate-180 object-contain"
      />

      {/* Right splashes */}
      <img
        ref={rightSplash2Ref}
        src={rightSplash2}
        alt="Right Splash2"
        className="absolute top-1/3 -translate-y-1/2 right-0 rotate-180 h-[80%] object-contain"
      />
      <img
        ref={rightSplashRef}
        src={rightSplash}
        alt="Right Splash"
        className="absolute top-0 right-0 h-full object-contain"
      />

 
      <div className="relative text-center z-10 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
          Roles & Responsibilities
        </h1>
      </div>

    
      <img
        ref={circularRef}
        src={centerImage}
        alt="Mandala"
        className="absolute opacity-80 w-[250px] sm:w-[400px] md:w-[500px]"
      />
    </div>
  );
};

export default RolesResponsibilities;
