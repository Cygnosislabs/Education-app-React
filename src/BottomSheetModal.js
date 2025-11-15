import React, { useState } from "react";

export default function BottomSheetModal({ onClose, onSelectSubject }) {
  const subjects = ["english", "social", "science"];

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={headingStyle}>🧠 Choose a Subject</h2>
        <div style={subjectsContainer}>
          {subjects.map((subject) => (
            <button
              key={subject}
              style={subjectButton}
              onClick={() => onSelectSubject(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent
  backdropFilter: "blur(6px)",         // This causes the blur
  WebkitBackdropFilter: "blur(6px)",   // For Safari support
  display: "flex",
  alignItems: "flex-end",
  zIndex: 1000,
};

const modalStyle = {
  width: "100%",
  height: "35vh",
  background: "rgba(43, 43, 43, 1)",
  backdropFilter: "blur(15px)",
  borderTopLeftRadius: "24px",
  borderTopRightRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.68)",
  padding: "24px 20px",
  animation: "slideUp 0.3s ease",
  color: "#fff",
  fontFamily: "'Poppins', sans-serif",
};

const headingStyle = {
  fontSize: "1.5rem",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#00D1FF",
  textAlign: "center",
};

const subjectsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const subjectButton = {
  padding: "12px",
  fontSize: "1rem",
  borderRadius: "14px",
  border: "none",
  backgroundColor: "rgba(24, 24, 24, 0.33)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "rgba(255, 204, 0, 0.6) 0px 0px 0px 0px, rgba(255, 140, 0, 0.4) 0px 0px 0px 2px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};


subjectButton[':hover'] = {
  transform: "scale(1.05)",
};
