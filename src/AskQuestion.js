import React, { useState, useRef, useEffect  } from "react";
import { Typewriter } from "react-simple-typewriter";


export default function AskQuestion() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const answerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (manualText) => {
    const question = typeof manualText === "string" ? manualText : inputText;
    if (!question.trim()) {
      return alert("Ask something!");
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/askDoctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          class_name: "class 4",
          subject: "english",
          lesson: "lesson",
        }),
      });

      const data = await res.json();
      setAnswer(data.response);
    } catch (err) {
      console.error("API Error:", err);
      alert("Error fetching response.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!answerRef.current) return;

    const observer = new MutationObserver(() => {
      // auto scroll to bottom
      answerRef.current.scrollTop = answerRef.current.scrollHeight;
    });

    observer.observe(answerRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [answer]);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#000",
        fontFamily: "Inter, Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // keeps footer at bottom
        padding: "25px",
        background: "linear-gradient(to bottom, #1a1b1b, #374045, #4d585d)",
      }}
    >
      {/* MAIN CONTENT */}
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          margin: "0 auto",
          flexGrow: 1,
          paddingBottom: "180px", // 👈 ADD THIS
        }}
      >
        {/* TOP MENU ICON */}
        <div style={{ padding: "10px" }}>
          <div
            style={{
              width: "28px",
              height: "2px",
              background: "#e0e0e0ff",
              marginBottom: "6px",
            }}
          ></div>
          <div
            style={{ width: "20px", height: "2px", background: "#e0e0e0ff" }}
          ></div>
        </div>

        {/* Greeting Section */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "42px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "#e0e0e0ff",
            }}
          >
            Hi, I'm{" "}
            <span style={{ color: "#FF5722", fontWeight:"800" }}>
              Doctora
            </span>
          </div>

          <p style={{ fontSize: "22px", color: "#e0e0e0ff" }}>
            We're glad you're here.
          </p>
        </div>

        {/* Input Card */}
        <div>
          {/* ANSWER BOX */}
          {answer && (
            <div
              ref={answerRef}
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "10px",
                height: "45vh",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  padding: "15px",
                  borderRadius: "15px",
                  maxWidth: "85%",
                  color: "#e0e0e0ff",
                }}
              >
                <strong>Answer:</strong>
                <br />
                <Typewriter
                  key={answer}
                  words={[answer]}
                  loop={1}
                  typeSpeed={10}
                  deleteSpeed={20}
                  delaySpeed={2000}
                  cursor
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER (fixed bottom always) */}
      {/* FIXED INPUT FOOTER */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "transparent",
          padding: "20px 25px",
          zIndex: 1000,
        }}
      >
        {/* Card */}
        <div
          style={{
            backgroundColor: "#262525",
            borderRadius: "20px",
            padding: "20px 25px",
            border: "1px solid #eaeaea",
            position: "relative",
            marginBottom: "60px",
          }}
        >
          {/* Textarea */}
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Ask to Doctora..."
            style={{
              width: "100%",
              fontSize: "18px",
              fontWeight: 500,
              border: "none",
              outline: "none",
              resize: "none",
              height: "90px",
              color: "#e0e0e0ff",
              fontFamily: "Inter, Poppins, sans-serif",
              background: "transparent",
            }}
          />

          {/* Character Count */}
          <div
            style={{ color: "#e0e0e0ff", fontSize: "14px", marginTop: "5px" }}
          >
            {inputText.length} / 18432
          </div>

          {/* SEND BUTTON (UP ARROW) */}
          <button
            onClick={() => handleSubmit()}
            style={{
              position: "absolute",
              right: "20px",
              bottom: "20px",
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              backgroundColor: "#0066ff",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
            }}
          >
            {loading ? (
              "..."
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 5V19M12 5L7 10M12 5L17 10"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div
        style={{
          zIndex: "99999",
          textAlign: "center",
          fontSize: "14px",
          color: "#e0e0e0ff",
        }}
      >
        Doctora is an AI, not a licensed doctor, and does not provide medical
        advice.
      </div>
    </div>
  );
}
