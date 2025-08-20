import React, { useState } from "react";
import AskQuestion from "./AskQuestion";
import BottomSheetModal from "./BottomSheetModal";

export default function StudentDashboard() {
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setShowModal(false);
    setShowAskQuestion(true);
  };

  if (showAskQuestion) {
    return (
      <AskQuestion
        subject={selectedSubject}
        
      />
    );
  }
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>🎓 AI Tutor</h1>
        <p style={subTextStyle}>Your Smart Student Dashboard</p>
      </div>

      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitle}>📝 Today's Homework</h3>
          <p style={cardDesc}>Check what tasks you have for today</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>📔 Diary Entry</h3>
          <p style={cardDesc}>See notes and updates from teachers</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>📊 AI Quiz</h3>
          <p style={cardDesc}>Take a quiz based on today's lesson</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>📚 Lesson Taught</h3>
          <p style={cardDesc}>Revise what was taught in class today</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitle}>🤖 Ask a Question</h3>
          <p style={cardDesc}>Ask anything you didn't understand</p>
          <button style={buttonStyle} onClick={() => setShowModal(true)}>
            💬 Ask AI
          </button>
        </div>
      </div>
      {showModal && (
        <BottomSheetModal
          onClose={() => setShowModal(false)}
          onSelectSubject={handleSelectSubject}
        />
      )}
    </div>
  );
}
const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #1a1b1b, #374045, #4d585d)",
  padding: "24px 16px",
  fontFamily: "'Poppins', sans-serif",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "24px",
};

const titleStyle = {
  fontSize: "2rem",
  color: "#00D1FF",
  marginBottom: "4px",
  fontWeight: "bold",
};

const subTextStyle = {
  fontSize: "1rem",
  color: "#ccc",
};

const cardContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(15px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "18px",
  padding: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  transition: "transform 0.2s ease",
};

const cardTitle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  marginBottom: "6px",
};

const cardDesc = {
  fontSize: "0.95rem",
  color: "#ccc",
};

const buttonStyle = {
  marginTop: "12px",
  padding: "10px",
  width: "100%",
  fontSize: "0.95rem",
  fontWeight: "bold",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(to right, #ffcb05, #ff8c00)",
  color: "#000",
  cursor: "pointer",
};
