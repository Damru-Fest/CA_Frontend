"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import ActionButton from "./actionButton";
import { usePathname, useRouter } from "next/navigation";




const Navbar = () => {
  const [navLinks, setNavLinks] = useState([
    { name: "About", id: "about", path: "/Pages/ambassador" },
    { name: "Role & Responsibilities", id: "roles", path: "/Pages/ambassador" },
    { name: "Benefits", id: "benefits", path: "/Pages/ambassador" },
  ]);
   useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdmin = sessionStorage.getItem("adminLoggedIn") === "true";

      setNavLinks((prev) => {
      
        const alreadyHasAdmin = prev.some((link) => link.id === "admin");
        if (isAdmin && !alreadyHasAdmin) {
          return [
            ...prev,
            { name: "Admin", id: "admin", path: "/Pages/Admin" },
          ];
        }
        return prev;
      });
    }
  }, []);
  

  
 
  const [menuOpen, setMenuOpen] = useState(false);
  const bellIconRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // GSAP animation for bell icon
  useEffect(() => {
    if (bellIconRef.current) {
      gsap.to(bellIconRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut",
      });
    }
  }, []);

  // Prevent horizontal scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflowX = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <nav
      className={`
    fixed top-0 left-0 z-50 w-full px-6 py-2 lg:px-12 transition-all duration-300
    ${
      menuOpen
        ? "bg-white/20 backdrop-blur-lg border border-white/30 rounded-b-xl"
        : scrolled
        ? "bg-black/10 backdrop-blur-lg"
        : "bg-transparent"
    }
  `}
      style={{ zIndex: 1000 }}
    >
      <div className="container flex items-center justify-between min-w-full">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/ambassdorAssets/logo.png"
            alt="Damru Logo"
            width={120}
            height={40}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path + (link.id ? `#${link.id}` : "")}
              className="text-white hover:text-gray-300 transition-colors"
              onClick={(e) => {
                // Handle smooth in-page scroll when already on the ambassador page
                if (link.id && pathname && pathname.includes("/ambassador")) {
                  e.preventDefault();
                  setMenuOpen(false);
                  const el = document.getElementById(link.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    return;
                  }
                }

                // Otherwise, navigate to the ambassador page with hash
                // Let Next handle the navigation if pathname is different
                if (
                  link.id &&
                  link.path &&
                  !pathname?.includes("/ambassador")
                ) {
                  e.preventDefault();
                  setMenuOpen(false);
                  // push with hash so browser navigates to section
                  router.push(link.path + `#${link.id}`);
                }
              }}
            >
              {link.name}
            </Link>
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
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
        style={{ width: "100vw" }}
      >
        <nav className="flex flex-col gap-4 bg-black/50 backdrop-blur-lg border border-white/30 rounded-lg p-4 text-white w-[90%] box-border">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path + (link.id ? `#${link.id}` : "")}
              className="hover:text-gray-300 transition-colors"
              onClick={(e) => {
                // Close menu first
                setMenuOpen(false);
                // If already on the ambassador page, perform smooth scroll
                if (link.id && pathname && pathname.includes("/ambassador")) {
                  e.preventDefault();
                  const el = document.getElementById(link.id);
                  if (el) {
                    // small timeout to allow menu to close and layout to settle
                    setTimeout(
                      () =>
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        }),
                      50
                    );
                  }
                }
                // otherwise allow Link/router to navigate to the page with hash
              }}
            >
              {link.name}
            </Link>
          ))}
          <ActionButton />
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
