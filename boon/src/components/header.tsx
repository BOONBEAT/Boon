"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Mobile from "./mobile-header";
import Image from "next/image";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Header = () => {
  const [top, setTop] = useState<boolean>(true);

  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <section
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out flex items-center   max-h-[70px] bg-black ${
        !top ? "backdrop-blur-sm shadow-lg bg-black/70" : ""
      }`}
    >
      <div className="flex flex-row w-full pr-6 items-center justify-between">
        <Link href="/" className="flex items-center relative -left-7">
          <Image
            className="w-32 h-32"
            width="250"
            height="250"
            src="/images/Boon-logo.svg"
            alt="Solana"
          />
          <h1 className=" absolute -right-4 font-bold text-lg ">Boon</h1>
        </Link>
        <ul className="hidden lg:flex gap-9 font-medium text-lg items-center">
          <li>
            <a href="https://medium.com/@boon1ecosystem/introducing-the-decentralised-music-ecosystem-on-solana-86184e56a749">
              Resources
            </a>
          </li>

          <li>
            <Link
              href="/search"
              className="bg-[#F7941E] px-3 py-2 text-black font-semibold rounded-2xl shadow-[#F7941E] "
            >
              Tap to Boon
            </Link>
          </li>
        </ul>
        <Mobile />
      </div>
    </section>
  );
};

export default Header;
