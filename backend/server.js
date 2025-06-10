const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

// Configure CORS to allow your frontend origin
const corsOptions = {
  origin: "http://localhost:3000",  // React frontend URL
  credentials: true,                 // Allow cookies/auth if needed
};
app.use(cors(corsOptions));

app.use(express.json());

// Serve static files for covers and audios
app.use("/uploads/covers", express.static(path.join(__dirname, "uploads/covers")));
app.use("/uploads/audios", express.static(path.join(__dirname, "uploads/audios")));

// Routes
const songRoutes = require("./routes/Api_song_route.js");
const authRoutes = require("./routes/auth");

app.use("/api/songs", songRoutes);
app.use("/api/auth", authRoutes);

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MONGO_URI:", process.env.MONGO_URI);
  console.log("MongoDB Atlas connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on mongodb_atlas:${process.env.PORT}`);
  });
})
.catch((err) => {console.error("Mongo Error:", err); console.log("MONGO_URI:", process.env.MONGO_URI);
});
