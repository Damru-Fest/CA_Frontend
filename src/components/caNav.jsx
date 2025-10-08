
// "use client";
// import { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { gsap } from 'gsap';
// import ActionButton from './ActionButton';

// const navLinks = [
//   { name: 'About', href: '#' },
//   { name: 'Role & Responsibilities', href: '#' },
//   { name: 'Benefits', href: '#' },
// ];

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const bellIconRef = useRef(null);

//   // GSAP animation for bell icon
//   useEffect(() => {
//     if (bellIconRef.current) {
//       gsap.to(bellIconRef.current, {
//         opacity: 0,
//         repeat: -1,
//         yoyo: true,
//         duration: 0.8,
//         ease: 'power1.inOut',
//       });
//     }
//   }, []);

//   // Prevent horizontal scroll when mobile menu is open
//   useEffect(() => {
//     document.body.style.overflowX = menuOpen ? 'hidden' : 'auto';
//   }, [menuOpen]);

//   return (
//     <nav
//       className={`
//         fixed top-0 left-0 z-50 w-full 
//         transition-colors duration-300
//         px-6 py-4 lg:px-12
//         ${menuOpen ? 'bg-white/20 backdrop-blur-lg border border-white/30 rounded-b-xl' : 'bg-transparent'}
//         md:bg-transparent md:border-0 md:backdrop-blur-none
//       `}
//     >
//       <div className="container flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/pages/ambassador">
//           <Image src="/ambassdorAssets/logo.png" alt="Damru Logo" width={120} height={40} />
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className="text-white hover:text-gray-300 transition-colors font-['Montserrat']"
//             >
//               {link.name}
//             </Link>
//           ))}
//           <ActionButton />
//           {/* Uncomment if you want the bell icon */}
//           {/* <Bell ref={bellIconRef} size={24} color="white" className="cursor-pointer" /> */}
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden flex items-center">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Toggle Menu"
//             className="text-white focus:outline-none"
//           >
//             <svg
//               className="w-8 h-8"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               {menuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`
//           md:hidden mt-4 transition-all duration-300 overflow-hidden
//           ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
//         `}
//         style={{ width: '100vw' }}
//       >
//         <nav className="flex flex-col gap-4 bg-black/50 backdrop-blur-lg border border-white/30 rounded-lg p-4 text-white w-[90%] box-border">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className="hover:text-gray-300 transition-colors ]"
//               onClick={() => setMenuOpen(false)}
//             >
//               {link.name}
//             </Link>
//           ))}
//           <ActionButton />
//         </nav>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


"use client";
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import ActionButton from './ActionButton';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Role & Responsibilities', href: '#roles' },
  { name: 'Benefits', href: '#benefits' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const bellIconRef = useRef(null);

  // GSAP animation for bell icon
  useEffect(() => {
    if (bellIconRef.current) {
      gsap.to(bellIconRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: 'power1.inOut',
      });
    }
  }, []);

  // Prevent horizontal scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflowX = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // Smooth scroll handler
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // adjust based on navbar height
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 z-50 w-full 
        transition-colors duration-300
        px-6 py-4 lg:px-12
        ${menuOpen ? 'bg-white/20 backdrop-blur-lg border border-white/30 rounded-b-xl' : 'bg-transparent'}
        md:bg-transparent md:border-0 md:backdrop-blur-none
      `}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/pages/ambassador">
          <Image src="/ambassdorAssets/logo.png" alt="Damru Logo" width={120} height={40} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScroll(link.href.replace('#', ''))}
              className="text-white hover:text-gray-300 transition-colors font-['Montserrat'] cursor-pointer"
            >
              {link.name}
            </button>
          ))}
          <ActionButton />
          {/* Uncomment if you want the bell icon */}
          {/* <Bell ref={bellIconRef} size={24} color="white" className="cursor-pointer" /> */}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden mt-4 transition-all duration-300 overflow-hidden
          ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
        style={{ width: '100vw' }}
      >
        <nav className="flex flex-col gap-4 bg-black/50 backdrop-blur-lg border border-white/30 rounded-lg p-4 text-white w-[90%] box-border">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScroll(link.href.replace('#', ''))}
              className="hover:text-gray-300 cursor-pointer transition-colors"
            >
              {link.name}
            </button>
          ))}
          <ActionButton />
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
