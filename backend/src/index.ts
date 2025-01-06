import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "@config/data-source";
import path from "path";
import helmet from "helmet";
import AuthRoute from "@routes/AuthRoute";
import AgendaRoute, { setSocketIO } from "@routes/AgendaRoute";
import { Server } from "socket.io";
import http from "http";
import { ButtonState } from "@entities/ButtonState"; // Import your ButtonState entity

dotenv.config();

// Initialize database connection (make sure the ButtonState entity is loaded in your data-source config)
AppDataSource.initialize();

const app = express();
const server = http.createServer(app);

// WebSocket server with CORS
const io = new Server(server, {
  cors: {
    origin: "http://192.168.43.189:5173", // React app origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// Apply middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.43.189:5173"], // React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "../uploads")));
// app.use("/", (req, res) => {
//   res.send("Hello from backend agenda");
// });

// Set WebSocket instance for the routes
setSocketIO(io);
app.use("/agenda", AgendaRoute);
app.use("/auth", AuthRoute);

// WebSocket Connection Handler
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
