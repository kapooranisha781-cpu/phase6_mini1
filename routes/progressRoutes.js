import express from "express";
import Progress from "../models/Progress.js";

const router = express.Router();

// POST - Add progress
router.post("/", async (req, res) => {
    try {
        const progress = new Progress(req.body);

        const savedProgress = await progress.save();

        res.status(201).json(savedProgress);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});


// GET - Get all progress
router.get("/", async (req, res) => {
    try {
        const progress = await Progress.find();

        res.json(progress);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

export default router;