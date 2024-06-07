"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Fetch: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
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

  useEffect(() => {
    // Start recording when the component mounts
    startRecording();

    // Cleanup function to stop recording when the component unmounts
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
    <>
      <div style={styles.container}>
        <i
          style={styles.hear}
          className={
            isRecording ? "bx bx-user-voice bx-burst" : "bx bx-user-voice"
          }
        ></i>
        <h4 style={styles.content}>
          {isRecording
            ? "Boon is detecting song, bring audio closer to your device..."
            : "Boon is done detecting, Here is what we found!"}
        </h4>

        {/* POP UP */}
        <div style={styles.overlay} id="overlay" ref={overlayRef}>
          <span
            style={styles.closeBtn}
            onClick={() => {
              if (overlayRef.current) overlayRef.current.style.display = "none";
              if (loadingRef.current) loadingRef.current.style.display = "none";
              if (responseRef.current)
                responseRef.current.style.display = "none";
            }}
          >
            &times;
          </span>
          <div style={styles.popup}>
            <>
              {/* LOADING */}
              <div style={{ display: "none" }} id="loading" ref={loadingRef}>
                <h1>
                  <i className="bx bx-loader-alt bx-spin"></i>Loading...
                </h1>
                <small style={styles.popupSmall}>
                  Song data coming through
                </small>
              </div>
              {/* RESPONSE */}
              <div style={{ display: "none" }} id="response" ref={responseRef}>
                <h1 style={styles.popupH1BxX}>
                  <i className="bx bxs-music"></i>
                  {result !== null ? "Found" : "Not Found"}
                </h1>

                {result !== null ? (
                  <>
                    <small style={styles.popupSmall}>
                      ARTIST: {result.artist}
                    </small>
                    <br />
                    <small style={styles.popupSmall}>
                      TITLE: {result.title}
                    </small>
                    <br />
                    <small style={styles.popupSmall}>
                      ALBUM: {result.album}
                    </small>
                    <br />
                    <small style={styles.popupSmall}>
                      Release Date: {result.release_date}
                    </small>
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
      </div>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    height: "100vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  content: {
    color: "#F7941E",
    fontSize: "16px",
    width: "fit-content",
    textAlign: "center",
    padding: "20px",
  },
  hear: {
    color: "#F7941E",
    fontSize: "70px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    position: "relative",
    width: "80%",
    maxWidth: "500px",
    padding: "20px",
    backgroundColor: "rgba(247, 148, 30, 0.2)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  popupH1BxX: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "red",
    borderRadius: "4px",
    border: "1px solid #F7941E",
  },
  popupSmall: {
    color: "white",
    width: "100%",
    fontSize: "11px",
    textAlign: "center",
  },
  popupSmallSpan: {
    fontSize: "15px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    fontSize: "35px",
    fontWeight: "bold",
    color: "#F7941E",
  },
};

export default Fetch;
