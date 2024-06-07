"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

const Search = () => {
  // wallet stuff
  const { publicKey } = useWallet();
  const address: any = publicKey?.toBase58();
  const router = useRouter();

  return (
    <main className="w-full h-screen bg-black">
      <section className="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out flex items-center   max-h-[70px] bg-black">
        <div className="flex flex-row w-full pr-6 items-center justify-between">
          <span className="flex items-center relative -left-7">
            <Image
              className="w-32 h-32"
              width="250"
              height="250"
              src="/images/Boon-logo.svg"
              alt="Solana"
            />
            <h1 className=" absolute -right-4 font-bold text-lg ">Boon</h1>
          </span>

          <span>
            <div className="flex-none">
              <WalletMultiButton
                className="bg-[#F7941E] px-3 py-1 text-black font-semibold rounded-2xl shadow-[#F7941E] "
                style={{
                  backgroundColor: "#F7941E",
                  color: "black",
                  fontWeight: "bold",
                }}
              />
            </div>
          </span>
        </div>
      </section>

      <section className="flex flex-col items-center w-full h-[80vh] sm:h-[65vh] lg:h-[60vh] bg-black px-3 lg:px-6 justify-between  relative top-32">
        <div className="flex flex-col w-full p-20 items-center justify-center text-white">
          <h1 className="w-fit text-2xl lg:text-4xl font-black text-[#F7941E]">
            Tap to Boon{" "}
          </h1>

          <h1 className="text-center">
            Wallet connected address is: <br />
            {address}
          </h1>
        </div>

        <span className="cursor-pointer">
          <Image
            className="w-56 lg:w-72"
            width="1000"
            height="1000"
            src="/images/b-hero2.png"
            alt="Solana"
            onClick={() => router.push("/fetch")}
          />
        </span>
      </section>
    </main>
  );
};

export default Search;
