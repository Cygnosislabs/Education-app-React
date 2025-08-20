import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Typewriter } from "react-simple-typewriter";

export default function AskQuestion(subject) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [initialGreeted, setInitialGreeted] = useState(false);
  const [voices, setVoices] = useState([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const voiceList = window.speechSynthesis.getVoices();
      if (voiceList.length > 0) {
        setVoices(voiceList);
      } else {
        setTimeout(loadVoices, 200); // Retry until voices load
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Speak function
  const speakText = (text, onEnd) => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1.5;
    utterance.volume = 1;
    utterance.onend = onEnd;

    const cuteVoice = voices.find(
      (v) =>
        (v.name.includes("Google UK English Female") ||
          v.name.includes("Microsoft Aria") ||
          v.name.includes("Microsoft Zira") ||
          (v.name.toLowerCase().includes("female") &&
            v.lang.toLowerCase().includes("en")))
    );

    if (cuteVoice) {
      utterance.voice = cuteVoice;
      console.log("✅ Using voice:", cuteVoice.name);
    } else {
      console.warn("❌ Using default voice");
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Initial greeting
  useEffect(() => {
    if (!initialGreeted && voices.length > 0) {
      setInitialGreeted(true);
      const welcome =
        "Hello! I'm your RoboLabs AI Tutor — here to make learning smarter, faster, and way more fun!";
      speakText(welcome);
      setAnswer(welcome);
    }
  }, [initialGreeted, voices]);

  // Auto-submit when speech ends
  useEffect(() => {
    if (transcript && !listening) {
      handleSubmit(transcript);
      setInputText("");
    }
  }, [transcript, listening]);

  const handleInputChange = (e) => {
    resetTranscript();
    setInputText(e.target.value);
  };

  const startMic = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser not supported for speech recognition.");
      return;
    }
    setInputText("");
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleSubmit = async (manualText) => {
    const question = typeof manualText === "string" ? manualText : inputText;
    if (!question.trim()) {
      return alert("Ask something!");
    }

    setLoading(true);
    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          class_name: "class 4",
          subject: subject.subject,
          lesson: "lesson",
        }),
      });

      const data = await res.json();
      setAnswer(data.response);
      speakText(data.response);
    } catch (err) {
      console.error("API Error:", err);
      alert("Error fetching response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #1f1f1f, #333)",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#212121",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "95vh",
        }}
      >
        {/* Header */}
        <div style={{ flexGrow: 1 }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#00D1FF",
            }}
          >
            🤖 AI Tutor
          </h2>

          {answer && (
            <div
              style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
            >
              <img
                src="/crobo.png"
                alt="robot"
                style={{ width: "40px", height: "40px" }}
              />
              <div
                style={{
                  background: "#424242",
                  padding: "10px 15px",
                  borderRadius: "15px 15px 15px 0",
                  maxWidth: "80%",
                }}
              >
                <strong>Answer: </strong>
                <Typewriter
                  key={answer}
                  words={[answer]}
                  loop={1}
                  typeSpeed={40}
                  deleteSpeed={20}
                  delaySpeed={2000}
                  cursor
                />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              value={inputText}
              onChange={handleInputChange}
              placeholder="Ask your question..."
              style={{
                flex: 1,
                borderRadius: "12px",
                padding: "12px",
                border: "1px solid #555",
                background: "#2b2b2b",
                color: "white",
                outline: "none",
              }}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />

            <button
              onClick={startMic}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "12px",
              }}
              title="Speak"
            >
              <img
                src="/mic.png"
                alt="Mic"
                style={{ width: "32px", height: "32px" }}
              />
            </button>

            <button
              onClick={() => handleSubmit()}
              style={{
                background: "#ffc107",
                color: "#000",
                border: "none",
                padding: "10px",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              title="Send"
            >
              {loading ? (
                <img
                  src="/loading.png"
                  alt="Loading"
                  style={{ width: "28px", height: "28px" }}
                />
              ) : (
                <img
                  src="/send.png"
                  alt="Send"
                  style={{ width: "25px", height: "25px" }}
                />
              )}
            </button>
          </div>

          {/* Transcript */}
          {transcript && (
            <div
              style={{
                marginTop: "10px",
                background: "#333",
                padding: "12px",
                borderRadius: "10px",
                color: "#00e5ff",
                fontWeight: "500",
              }}
            >
              🎙️ <strong>Transcript:</strong> {transcript}
            </div>
          )}

          {listening && (
            <div
              style={{
                marginTop: "10px",
                color: "#00e5ff",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              🎤 Listening...
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
