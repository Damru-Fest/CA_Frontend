"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const leftHandImage = "/ambassdorAssets/lefthand.png";
const rightHandImage = "/ambassdorAssets/righthand.png";
const cardImage1 = "/ambassdorAssets/card1.png";
const cardImage2 = "/ambassdorAssets/card2.png";
const cardImage3 = "/ambassdorAssets/card3.png";
const cardImage4 = "/ambassdorAssets/card4.png";
const cardImage5 = "/ambassdorAssets/card5.png";

const DamruFest = () => {
  const sectionRef = useRef(null);
  const leftHandRef = useRef(null);
  const rightHandRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);
  const marqueeRef = useRef(null);

  const marqueeAnimation = useRef(null);

  const setupHoverAnimations = () => {
    const cards = [
      { ref: card1Ref, rotation: -12 },
      { ref: card2Ref, rotation: -6 },
      { ref: card3Ref, rotation: 0 },
      { ref: card4Ref, rotation: 6 },
      { ref: card5Ref, rotation: 12 },
    ];

    cards.forEach((card) => {
      const element = card.ref.current;
      if (!element) return;

      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          scale: 1.1,
          y: -10,
          rotation: card.rotation,
          zIndex: 50,
          duration: 0.3,
          ease: "power2.out",
        });
        if (marqueeAnimation.current) {
          marqueeAnimation.current.pause();
        }
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          rotation: card.rotation,
          zIndex: "auto",
          duration: 0.3,
          ease: "power2.out",
        });
        if (marqueeAnimation.current) {
          marqueeAnimation.current.play();
        }
      });
    });
  };

  const setupMarqueeAnimation = () => {
    if (!marqueeRef.current) return;

    const marqueeWidth = marqueeRef.current.scrollWidth / 2;

    marqueeAnimation.current = gsap.to(marqueeRef.current, {
      x: -marqueeWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  };

  const cleanupHoverAnimations = () => {
    const cards = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref];

    cards.forEach((cardRef) => {
      const element = cardRef.current;
      if (!element) return;

      const newElement = element.cloneNode(true);
      element.parentNode.replaceChild(newElement, element);
      cardRef.current = newElement;
    });
  };

  useEffect(() => {
    const sectionElement = sectionRef.current;

    // Parallax scroll effect for left and right hand
    if (leftHandRef.current && sectionRef.current) {
      gsap.to(leftHandRef.current, {
        y: "70%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
    if (rightHandRef.current && sectionRef.current) {
      gsap.to(rightHandRef.current, {
        y: "-60%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    setupHoverAnimations();
    setupMarqueeAnimation();

    return () => {
      cleanupHoverAnimations();
      if (marqueeAnimation.current) {
        marqueeAnimation.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const cardImages = [
    cardImage1,
    cardImage2,
    cardImage3,
    cardImage4,
    cardImage5,
  ];

  return (
    <>
      <section id="about">
        <div
          ref={sectionRef}
          className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black text-white p-4 overflow-hidden"
        >
          <img
            ref={leftHandRef}
            src={leftHandImage}
            alt="Decorative hand pointing from top left"
            className="absolute -top-12 -left-12 w-1/4 max-w-xs md:max-w-md lg:max-w-lg pointer-events-none z-99 -rotate-10"
          />
          <img
            ref={rightHandRef}
            src={rightHandImage}
            alt="Decorative hand pointing from bottom right"
            className="absolute bottom-0 right-0 w-1/5 pointer-events-none"
          />

          <main className="relative z-10 flex flex-col items-center justify-center w-full">
            {/* Small screen: Horizontal Marquee */}
            <div className="md:hidden w-full overflow-hidden py-8">
              <div
                ref={marqueeRef}
                className="flex gap-6 will-change-transform"
              >
                {cardImages.map((img, idx) => (
                  <img
                    key={`card-1-${idx}`}
                    ref={
                      idx === 0
                        ? card1Ref
                        : idx === 1
                        ? card2Ref
                        : idx === 2
                        ? card3Ref
                        : idx === 3
                        ? card4Ref
                        : card5Ref
                    }
                    src={img}
                    alt={`Event scene ${idx + 1}`}
                    className="flex-shrink-0 w-64 h-80 object-cover rounded-lg shadow-2xl cursor-pointer transform hover:scale-105 transition-transform"
                    style={{ transform: `rotate(${(idx - 2) * 3}deg)` }}
                  />
                ))}
                {cardImages.map((img, idx) => (
                  <img
                    key={`card-2-${idx}`}
                    src={img}
                    alt={`Event scene ${idx + 1}`}
                    className="flex-shrink-0 w-64 h-80 object-cover rounded-lg shadow-2xl cursor-pointer"
                    style={{ transform: `rotate(${(idx - 2) * 3}deg)` }}
                  />
                ))}
              </div>
            </div>

            {/* Medium and Large screens: Original fan layout */}
            <div className="hidden md:block relative w-full max-w-6xl h-66 md:h-90 lg:h-[27rem]">
              <img
                ref={card1Ref}
                src={cardImage1}
                alt="Event scene 1"
                className="absolute w-32 md:w-44 lg:w-52 rounded-lg shadow-lg transform -rotate-12 top-20 md:top-60 md:left-8 -lg:left-30 z-10 cursor-pointer"
              />
              <img
                ref={card2Ref}
                src={cardImage2}
                alt="Event scene 2"
                className="absolute w-36 md:w-56 lg:w-60 rounded-lg shadow-lg transform -rotate-6 top-20 left-20 md:left-32 lg:left-48 z-20 cursor-pointer"
              />
              <img
                ref={card3Ref}
                src={cardImage3}
                alt="Event scene 3"
                className="absolute w-44 md:w-48 lg:w-60 rounded-lg shadow-2xl top-4 md:top-8 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
              />
              <img
                ref={card4Ref}
                src={cardImage4}
                alt="Event scene 4"
                className="absolute w-36 md:w-56 lg:w-60 rounded-lg shadow-lg transform rotate-6 top-20 right-20 md:right-32 lg:right-48 z-20 cursor-pointer"
              />
              <img
                ref={card5Ref}
                src={cardImage5}
                alt="Event scene 5"
                className="absolute w-32 md:w-44 lg:w-52 rounded-lg shadow-lg transform rotate-12 top-8 md:top-60 right-0 md:right-8 -lg:right-32 z-10 cursor-pointer"
              />
            </div>

            <div className="text-center max-w-2xl mt-8">
              <p className="text-base md:text-lg leading-relaxed">
                The <span className="font-bold">Damru Fest</span> is an annual
                two-day cultural carnival hosted by Rishihood University in
                Delhi NCR. The 2024 edition ran on 29th & 30th November featured
                live music, dance battles, <br className="hidden md:inline" />
                art installations, workshops and more — designed to draw both
                campus and off campus crowds
              </p>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default DamruFest;
