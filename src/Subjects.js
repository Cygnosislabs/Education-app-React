import React, { useState } from "react";
// import SubjectPage from "./SubjectPage"; // if you want to navigate later

export default function StudentDashboard() {
  const subjects = ["English", "Math", "Science", "Social", "Computer"];
  const [selectedSubject, setSelectedSubject] = useState(null);

  // if (selectedSubject) return <SubjectPage subject={selectedSubject} onBack={() => setSelectedSubject(null)} />;

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>🎓 Welcome to AI Tutor</h1>
      <p style={subheadingStyle}>Select a subject to continue</p>

      <div style={subjectContainerStyle}>
        {subjects.map((subject) => (
          <div
            key={subject}
            style={subjectCardStyle}
            onClick={() => setSelectedSubject(subject)}
          >
            📘 {subject}
          </div>
        ))}
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  background:
    "linear-gradient(to right, rgb(26 27 27), rgb(56 66 69), rgb(77 88 93))",
  padding: "20px",
  fontFamily: "'Poppins', sans-serif",
  color: "#f1f1f1",
};

const headingStyle = {
  fontSize: "1.8rem",
  textAlign: "center",
  color: "#00BFFF",
  marginBottom: "10px",
};

const subheadingStyle = {
  textAlign: "center",
  marginBottom: "24px",
  fontSize: "1rem",
  color: "#ccc",
};

const subjectContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const subjectCardStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(15px)",
  borderRadius: "16px",
  padding: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
  fontSize: "1.2rem",
  fontWeight: "600",
  textAlign: "center",
  cursor: "pointer",
  transition: "transform 0.2s",
};

