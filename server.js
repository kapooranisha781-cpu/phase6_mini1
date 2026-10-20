import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import progressRoutes from "./routes/progressRoutes.js";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/progress", progressRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });

// Home route
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});