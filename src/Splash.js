import React, { useState } from "react";
import AskQuestion from "./AskQuestion";

export default function Splash() {
  const [showDashboard, setShowDashboard] = useState(false);

  // Simulate splash duration (if needed)
  React.useEffect(() => {
    const timer = setTimeout(() => setShowDashboard(true), 2500); // 2.5 sec
    return () => clearTimeout(timer);
  }, []);

  if (showDashboard) {
    return <AskQuestion />;
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
        background: "linear-gradient(to bottom, #1a1b1b, #374045, #4d585d)",
      }}
    >
      <img
        src="/splash.png" // Place GIF in /public
        alt="Splash Screen"
        style={{
          width: "90%",
          height: "90%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
