import React, { useState, useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import "./App.css";
import StudentDashboard from "./StudentDashboard";

export default function Intro() {
  const introText = "Hello, welcome to Robolabs AI Tutor – your study assistant";

  const [startTypewriter, setStartTypewriter] = useState(false);
  const [showStudentDashboard, setShowStudentDashboard] = useState(false);

  const hasSpoken = useRef(false); // ✅ Avoid repeated speakNow
  const voiceListenerAttached = useRef(false); // ✅ Track if listener added

  useEffect(() => {
    setStartTypewriter(true);
    speakText(introText);
  }, []);

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      setShowStudentDashboard(true);
    };

    const speakNow = () => {
      if (hasSpoken.current) return; // ✅ Already spoken
      hasSpoken.current = true;
      window.speechSynthesis.cancel(); // Cancel any previous speech
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      if (!voiceListenerAttached.current) {
        window.speechSynthesis.onvoiceschanged = () => {
          speakNow();
        };
        voiceListenerAttached.current = true;
      }
    } else {
      speakNow();
    }
  };

  if (showStudentDashboard) {
    return <StudentDashboard />;
  }

  return (
    <div
      className="app-container"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, rgb(26 27 27), rgb(56 66 69), rgb(77 88 93))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
        color: "#f1f1f1",
      }}
    >
      <img
        src="/tutor.png"
        alt="AI Tutor"
        style={{ width: "250px", marginBottom: "20px" }}
      />

      {startTypewriter && (
        <div
          style={{
            color: "#00BFFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2.6rem",
            fontWeight: 500,
            textAlign: "center",
            maxWidth: "90%",
          }}
        >
          <Typewriter
            words={[introText]}
            loop={1}
            typeSpeed={40}
            deleteSpeed={0}
            cursor
            delaySpeed={1000}
          />
        </div>
      )}
    </div>
  );
}
