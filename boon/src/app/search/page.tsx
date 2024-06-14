"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectMobile from "@/components/connect-mobile";

const Search: React.FC = () => {
  // wallet stuff
  const { publicKey, connected } = useWallet();
  const address: any = publicKey?.toBase58();

  const [userInit, setUserInit] = useState<Boolean>(false);
  const [initialPoints, setInitialPoints] = useState<number>(0);
  const [isRecording, setIsRecording] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [result, setResult] = useState({
    album: "Beautiful People (feat. Khalid)",
    artist: "Ed Sheeran",
    label: "Atlantic Records UK",
    release_date: "2019-06-28",
    song_link: "https://lis.tn/aRElZ",
    timecode: "00:14",
    title: "Beautiful People (feat. Khalid)",
  });

  ///////create user //////////

  const createUser = async (addy: any) => {
    try {
      const createUserResponse = await fetch(
        "https://boon-tuug.onrender.com/api/v1/user/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ walletAddress: addy, points: 0 }),
        }
      );

      const data = await createUserResponse.json();

      if (data.status === "success") {
        console.log("User created successfully");
        setUserInit(true);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // fetch points ////////
  const fetchUserPoints = useCallback(async () => {
    try {
      const response = await fetch(
        `https://boon-tuug.onrender.com/api/v1/user/getUser/${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const points = data.points;
      setInitialPoints(points);

      if (response.ok) {
        setUserInit(true);
      } else {
        console.error("Failed to fetch user points:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user points:", error);
    }
  }, [address]);

  /// ////////////////////////////////////////////////////

  useEffect(() => {
    if (address) {
      fetchUserPoints();
      createUser(address);
    }
  }, [address, fetchUserPoints]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const responseRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const startRecording = async () => {
    // console.log("yes");

    try {
      // console.log("started");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        if (overlayRef.current) overlayRef.current.style.display = "flex";
        if (loadingRef.current) loadingRef.current.style.display = "block";
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioFile = new File([audioBlob], "recording.wav", {
          type: "audio/wav",
        });

        // Upload to Audd.io for recognition
        const formData = new FormData();
        formData.append("file", audioFile);
        formData.append("api_token", "7547ab8306103fa8a88844f4be5c287c");

        try {
          const response = await axios.post("https://api.audd.io/", formData);
          console.log(response);
          if (response.data.result) {
            setResult(response.data.result);
            if (loadingRef.current) loadingRef.current.style.display = "none";
            if (responseRef.current)
              responseRef.current.style.display = "block";
          } else {
            setResult(response.data.result);
            if (loadingRef.current) loadingRef.current.style.display = "none";
            if (responseRef.current)
              responseRef.current.style.display = "block";
          }
        } catch (error) {
          console.error("Error recognizing music:", error);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Automatically stop recording after 50 seconds
      setTimeout(() => {
        stopRecording();
      }, 25000);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const modalStart: any = () => {
    setModalState(true);
    startRecording();
  };

  const modalEnd: any = () => {
    setModalState(false);
    stopRecording();
  };

  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        stopRecording();
      }
    };
  }, []);

  return (
    <main className="w-full h-screen bg-black md:overflow-hidden">
      <section className="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out flex items-center   max-h-[70px] bg-black ">
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

          <div className="hidden lg:flex">
            <li className="text-sm md:text-lg font-bold text-white hover:text-[#ffb703] w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm transition duration-150 ease-in-out">
              <span className="mx-2 text-[#F7941E]/60 text-sm font-bold">
                {connected ? `Boon Points: ${initialPoints}` : ""}
              </span>
            </li>

            <div className="flex-none">
              <WalletMultiButton
                className="bg-[#F7941E]   text-black font-semibold rounded-2xl shadow-[#F7941E] "
                style={{
                  backgroundColor: "#F7941E",
                  color: "black",
                  fontWeight: "bold",
                }}
              />
            </div>
          </div>

          <ConnectMobile points={initialPoints} />
        </div>
      </section>

      <section className="flex flex-col items-center w-full h-[94vh] md:h-screen bg-black px-3 lg:px-6 relative top-16 ">
        <div className="flex flex-col w-full py-12 lg:p-20 items-center justify-center text-white">
          <div className="flex w-full flex-col gap-8 justify-center items-center">
            <h1 className="w-fit text-2xl lg:text-4xl font-black text-[#F7941E]">
              Tap to Boon
            </h1>
            <p className="text-white/60 text-xs md:text-base">
              Hear any music playing? Discover the song now!
            </p>
          </div>
        </div>

        <div className="flex flex-col  items-center justify-center cursor-pointer">
          <span className="border-4 border-[#201306] rounded-full ">
            <Image
              className={`w-56  bg-black border-4 rounded-full border-[#201306]  lg:w-64 my-8 mx-8 ${
                isRecording ? "bx bx-user-voice bx-burst" : "bx bx-user-voice "
              }`}
              width="1000"
              height="1000"
              src="/images/Boon-logo.svg"
              alt="Solana"
              onClick={modalStart}
            />
          </span>

          <h4 className="mt-9 text-white/70 text-xs md:text-base">
            {isRecording
              ? "Boon is detecting song, bring audio closer to your device..."
              : "Discover New Music around you"}
          </h4>
        </div>
      </section>

      <div
        className={`absolute  top-32 mx-4 md:mx-24 lg:mx-32 flex flex-col items-center justify-center rounded-3xl bg-[#271807] w-[92%] md:w-[80%] h-[70%] border-l-8 border-r-8 border-2 border-white/10  ${
          result !== null ? "hidden" : "flex"
        }`}
        id="overlay"
        ref={overlayRef}
      >
        <span
          className="absolute top-4 right-8 text-4xl lg:text-6xl cursor-pointer"
          onClick={() => {
            // modalEnd();
            if (overlayRef.current) overlayRef.current.style.display = "none";
            if (loadingRef.current) loadingRef.current.style.display = "none";
            if (responseRef.current) responseRef.current.style.display = "none";
          }}
        >
          &times;
        </span>
        <div className="flex w-[90%] sm:w-[100%] sm:px-52">
          <>
            {/* LOADING */}
            <div
              className="flex flex-col  gap-8 font-bold  "
              style={{ display: "none" }}
              id="loading"
              ref={loadingRef}
            >
              <h1 className="text-xs lg:text-lg text-[#F7941E] ">
                <i className="bx bx-loader-alt bx-spin"></i>Loading...
              </h1>
              <small className="text-xs lg:text-lg ">
                Song data coming through
              </small>
            </div>
            {/* RESPONSE */}
            <div
              className="flex w-full items-center justify-center flex-col gap-12"
              style={{ display: "none" }}
              id="response"
              ref={responseRef}
            >
              <h1 className=" font-bold flex gap-2 items-center md:text-2xl lg:font-4xl text-[#F7941E] py-4">
                <i className="bx bxs-music "></i>
                {result !== null ? "Found" : "Not Found"}
              </h1>

              {result !== null ? (
                <div className="flex flex-col gap-4 w-full">
                  <small className=" flex gap-2 items-center md:text-base  lg:font-lg font-semibold tracking-widest">
                    {" "}
                    <span className="text-[#F7941E] font-bold">ARTIST: </span>
                    {result.artist}
                  </small>

                  <small className=" flex gap-2 items-center md:text-lg  lg:font-xl font-semibold">
                    {" "}
                    TITLE:{" "}
                    <span className="text-[#F7941E] font-bold">
                      {result.title}
                    </span>{" "}
                  </small>

                  <small className=" flex gap-2 items-center md:text-lg  lg:font-xl font-semibold">
                    ALBUM: {result.album}
                  </small>

                  <small className=" flex gap-2 items-center md:text-lg  lg:font-xl font-semibold">
                    Release Date: {result.release_date}
                  </small>

                  <div className="flex gap-4">
                    <a
                      className="  md:w-48 lg:w-52 p-2 inline-flex items-center justify-center bg-[#201306]  text-white text-xs md:text-base border-l-4 border-r-4 border border-white/10 font-bold rounded-full outline-1 outline-double outline-[#201306] hover:bg-[#ff9a03]/50 hover:text-black"
                      href={result.song_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link to song
                    </a>

                    <a
                      className="  md:w-48 lg:w-52 p-2 inline-flex items-center justify-center bg-[#201306]  text-white text-xs md:text-base   border-l-4 border-r-4 border border-white/10 font-bold rounded-full outline-1 outline-double outline-[#201306] hover:bg-[#ff9a03]/50 hover:text-black"
                      href="/search"
                    >
                      Click to boon again
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <small>Try to listen again</small> <br />
                  <a href="/search">Click to boon again</a>
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </main>
  );
};

export default Search;
