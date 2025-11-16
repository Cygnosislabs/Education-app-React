import React, { useState, useRef, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

export default function AskQuestion() {
  const [answer, setAnswer] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // used for both operations
  const [loadingNearby, setLoadingNearby] = useState(false); // NEW → Nearby loading
  const [inputText, setInputText] = useState("");
  const answerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // ---------------------------
  // AskDoctor API
  // ---------------------------
  const handleSubmit = async () => {
    if (!inputText.trim()) return alert("Please ask something!");

    setLoading(true);
    setHospitals([]);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/askDoctor`
, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: inputText,
          class_name: "class 4",
          subject: "english",
          lesson: "lesson",
        }),
      });

      const data = await res.json();
      setAnswer(data.response);
    } catch (err) {
      alert("Error connecting to Doctora.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Get location
  // ---------------------------
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => reject(err)
      );
    });
  };

  // ---------------------------
  // Nearby Hospitals API
  // ---------------------------
  const handleNearbySearch = async () => {
    if (!inputText.trim())
      return alert("Describe your symptom to search hospitals!");

    setLoadingNearby(true);
    setAnswer("");
    setHospitals([]);

    try {
      const { lat, lng } = await getLocation();

      const res = await fetch("http://127.0.0.1:5000/nearbyHospitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inputText, lat, lng }),
      });

      const data = await res.json();
      setHospitals(data.hospitals || []);

      if (data.hospitals?.length > 0) setShowModal(true);
    } catch (err) {
      alert("Unable to fetch nearby hospitals.");
    } finally {
      setLoadingNearby(false);
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (!answerRef.current) return;

    const observer = new MutationObserver(() => {
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
        minHeight: "100dvh",
        color: "#000",
        fontFamily: "Inter, Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "25px",
        background: "linear-gradient(to bottom, #1a1b1b, #374045, #4d585d)",
      }}
    >
      {/* FULL SCREEN LOADING OVERLAY FOR NEARBY SEARCH */}
      {loadingNearby && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 9999999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <div
            style={{
              border: "6px solid #555",
              borderTop: "6px solid #ff5722",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>

          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              textAlign: "center",
              width: "80%",
            }}
          >
            Searching for nearby hospitals related to your issue…  
            <br />
            <span style={{ fontSize: "15px", opacity: 0.8 }}>
              Please wait…
            </span>
          </p>

          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          margin: "0 auto",
          flexGrow: 1,
          paddingBottom: "260px",
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

        {/* Greeting */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div
            style={{
              fontSize: "38px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "#e0e0e0ff",
            }}
          >
            Hi, I'm{" "}
            <span style={{ color: "#FF5722", fontWeight: "800" }}>Doctora</span>
          </div>

          <p style={{ fontSize: "22px", color: "#e0e0e0ff" }}>
            We're glad you're here.
          </p>
        </div>

        {/* Answer Section */}
        {answer && (
          <div
            ref={answerRef}
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "10px",
              height: "42vh",
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

      {/* FIXED INPUT CARD */}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          padding: "20px 20px 60px 20px",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "#262525",
            borderRadius: "20px",
            padding: "20px 25px",
            border: "1px solid #eaeaea22",
            position: "relative",
          }}
        >
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Ask to Doctora..."
            style={{
              width: "100%",
              fontSize: "18px",
              border: "none",
              outline: "none",
              resize: "none",
              height: "90px",
              color: "#e0e0e0",
              background: "transparent",
            }}
          />

          <div style={{ color: "#e0e0e0", fontSize: "14px" }}>
            {inputText.length} / 18432
          </div>

          {/* Send Button */}
         <button
  onClick={handleSubmit}
  style={{
    position: "absolute",
    right: "20px",
    bottom: "20px",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    backgroundColor: "#0066ff",
    border: "none",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  {loading ? (
    <div
      style={{
        width: "24px",
        height: "24px",
        border: "3px solid rgba(255,255,255,0.4)",
        borderTopColor: "#fff",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    ></div>
  ) : (
    "↑"
  )}

  <style>
    {`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}
  </style>
</button>
        </div>

        {/* NAV-PILL BUTTON */}
        <div style={{ textAlign: "center", marginTop: "18px" }}>
          <button
            onClick={handleNearbySearch}
            style={{
              background: "transparent",
              padding: "12px 28px",
              borderRadius: "50px",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              border: "2px solid #ff5722",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            }}
          >
            🔍 Search Nearby Hospitals
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: "#e0e0e0",
          marginTop: "5px",
        }}
      >
        Doctora is an AI, not a licensed doctor.
      </div>

      {/* -----------------------------------------------------
           FULL SCREEN MODAL FOR HOSPITAL LIST
         ----------------------------------------------------- */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 999999,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              height: "85vh",
              background: "#1f1f1f",
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
              padding: "20px",
              overflowY: "auto",
              animation: "slideUp 0.3s ease-out",
            }}
          >
            {/* Close Button */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "#333",
                  border: "none",
                  borderRadius: "50px",
                  padding: "8px 20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>

            <h2 style={{ color: "#ffcc80", textAlign: "center" }}>
              Nearby Hospitals
            </h2>

            {hospitals.map((h, i) => (
              <div
                key={i}
                style={{
                  background: "#2d2d2d",
                  padding: "15px",
                  marginTop: "12px",
                  borderRadius: "12px",
                  border: "1px solid #444",
                }}
              >
                <h3 style={{ color: "#ffcc80" }}>{h.name}</h3>
                <p style={{ color: "#ddd" }}>{h.address}</p>
                <p style={{ color: "#bbb" }}>Rating: ⭐ {h.rating}</p>

                <a
                  href={`https://www.google.com/maps?q=${h.lat},${h.lng}`}
                  target="_blank"
                  style={{ color: "#4eaaff" }}
                  rel="noreferrer"
                >
                  View on Google Maps →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
