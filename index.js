const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.io event handlers
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  // Listen for admin's file selection
  socket.on("fileSelected", (fileUrl) => {
    io.emit("fileSelected", fileUrl);
  });

  // Listen for admin's page change
  socket.on("adminPageChange", (page) => {
    io.emit("pageChange", page);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Basic route
app.get("/", (req, res) => {
  res.send("SERVER IS UP");
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
