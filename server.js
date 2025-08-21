const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Serve React build
app.use(express.static(path.join(__dirname, "build")));

// Proxy Flask backend routes
app.use(
  ["/ask", "/generate", "/feedback", "/revise"],
  createProxyMiddleware({
    target: "http://backend:5000",
    changeOrigin: true,
  })
);

// Handle React Router (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});

