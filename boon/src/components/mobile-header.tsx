"use client";

import React from "react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaBarsStaggered, FaX } from "react-icons/fa6";

const Mobile: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  // Close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent): void => {
      if (
        mobileNav.current &&
        trigger.current &&
        !mobileNav.current.contains(event.target as Node) &&
        !trigger.current.contains(event.target as Node)
      ) {
        setMobileNavOpen(false);
      }
    };

    if (mobileNavOpen) {
      document.addEventListener("click", clickHandler);
    }

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [mobileNavOpen]);

  // Close the mobile menu if the ESC key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
      }
    };

    if (mobileNavOpen) {
      document.addEventListener("keydown", keyHandler);
    }

    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, [mobileNavOpen]);

  return (
    <div className="lg:hidden">
      {mobileNavOpen ? (
        <button onClick={() => setMobileNavOpen(false)}>
          <FaX className="w-6 h-6 fill-current text-white transition duration-200 ease-in-out block   aspect-square" />
        </button>
      ) : (
        <button onClick={() => setMobileNavOpen(true)}>
          <FaBarsStaggered className="w-6 h-6 fill-current text-white transition duration-200 ease-in-out block   aspect-square" />
        </button>
      )}

      <nav
        id="mobile-nav"
        ref={mobileNav}
        className={`absolute top-20 z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileNavOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-80"
        }`}
      >
        <ul className="flex flex-col items-center justify-center  gap-4 bg-[#271807] border-l-4 border-r-4 border border-white/10 px-4 py-8 rounded-xl">
          <li
            className="md:text-lg font-bold text-white hover:text-[#ffb703] w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm transition duration-150 ease-in-out"
            onClick={() => setMobileNavOpen(false)}
          >
            <a href="https://medium.com/@boon1ecosystem/introducing-the-decentralised-music-ecosystem-on-solana-86184e56a749">
              Resources
            </a>
          </li>

          <li>
            <Link
              href="/search"
              className="w-72 p-2 inline-flex items-center justify-center bg-[#201306]  text-white  border-l-4 border-r-4 border border-white/10 font-bold rounded-full outline-1 outline-double outline-[#201306] hover:bg-[#ff9a03]/50 hover:text-black"
              onClick={() => setMobileNavOpen(false)}
            >
              Tap to Boon
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Mobile;
