import React, { useState } from "react";
import Intro from "./Intro";
import StudentDashboard from "./StudentDashboard";


export default function Splash() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleVideoEnd = () => {
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <StudentDashboard />;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <video
        src="/splas.mp4" // Ensure it's placed inside /public directory
        autoPlay
        muted
        onEnded={handleVideoEnd}
        style={{
          width: "70%",
          height: "70%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
