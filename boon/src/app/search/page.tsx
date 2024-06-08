"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";


const Search: React.FC = () => {
  // wallet stuff
  const { publicKey } = useWallet();
  const address: any = publicKey?.toBase58();


  /// ////////////////////////////////////////////////////

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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const responseRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const startRecording = async () => {
    console.log("yes");

    try {
      console.log("started");
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

  const walletAddresssave = async () => {
    const response = await fetch("/api/wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletKey: address }),
    });

    if (response.ok) {
      console.log("Wallet key sent to backend successfully");
    } else {
      console.error("Failed to send wallet key");
    }
  };

  useEffect(() => {
    // // Start recording when the component mounts
    // startRecording();

    // Cleanup function to stop recording when the component unmounts
    walletAddresssave();
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
    <main className="w-full h-screen bg-black overflow-hidden">
      <section className="fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out flex items-center   max-h-[70px] bg-black ">
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

      <section className="flex flex-col items-center w-full h-screen bg-black px-3 lg:px-6 relative top-16 overflow-hidden">
        <div className="flex flex-col w-full p-20 items-center justify-center text-white">
          <h1 className="w-fit text-2xl lg:text-4xl font-black text-[#F7941E]">
            Tap to Boon
          </h1>

          <h1 className="text-center">
            Wallet connected address is: <br />
            {address}
          </h1>
        </div>

        <div className="flex flex-col  items-center justify-center cursor-pointer">
          <Image
            className={`w-56 lg:w-64 ${
              isRecording ? "bx bx-user-voice bx-burst" : "bx bx-user-voice"
            }`}
            width="1000"
            height="1000"
            src="/images/Boon-logo.svg"
            alt="Solana"
            onClick={modalStart}
          />
          <h4 className="mt-4">
            {isRecording
              ? "Boon is detecting song, bring audio closer to your device..."
              : "Discover New Music around you"}
          </h4>
        </div>
      </section>

      <div
        className={`absolute  top-32 mx-24 lg:mx-32 flex flex-col items-center justify-center rounded-3xl bg-[#271807] w-[80%] h-[70%] ${
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
        <div>
          <>
            {/* LOADING */}
            <div style={{ display: "none" }} id="loading" ref={loadingRef}>
              <h1>
                <i className="bx bx-loader-alt bx-spin"></i>Loading...
              </h1>
              <small>Song data coming through</small>
            </div>
            {/* RESPONSE */}
            <div style={{ display: "none" }} id="response" ref={responseRef}>
              <h1>
                <i className="bx bxs-music"></i>
                {result !== null ? "Found" : "Not Found"}
              </h1>

              {result !== null ? (
                <>
                  <small>ARTIST: {result.artist}</small>
                  <br />
                  <small>TITLE: {result.title}</small>
                  <br />
                  <small>ALBUM: {result.album}</small>
                  <br />
                  <small>Release Date: {result.release_date}</small>
                  <br />
                  <a
                    href={result.song_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link to song
                  </a>
                  <br />
                  <a href="/fetch">Click to boon again</a>
                </>
              ) : (
                <>
                  <small>Try to listen again</small> <br />
                  <a href="/fetch">Click to boon again</a>
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
