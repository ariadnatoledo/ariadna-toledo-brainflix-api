import express from "express";
import fs from "fs/promises"; 
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// GET all videos
router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("data/videos.json", "utf-8");
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error("Error reading data from file", error);
    res.status(500).json({ error: "Error reading file" });
  }
});

// GET video by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await fs.readFile("data/videos.json", "utf-8");
    const jsonData = JSON.parse(data);
    const foundVideo = jsonData.find((video) => video.id === req.params.id);

    if (foundVideo) {
      res.json(foundVideo);
    } else {
      res.status(404).json({ error: "Video not found" });
    }
  } catch (error) {
    console.error("Error reading data from file", error);
    res.status(500).json({ error: "Error reading file" });
  }
});

// POST to add a new video
router.post("/", async (req, res) => {
  try {
    const data = await fs.readFile("data/videos.json", "utf-8");
    const videos = JSON.parse(data);

    const newVideo = {
      id: uuidv4(),
      title: req.body.title,
      channel: req.body.channel,
      image: "http://localhost:8080/images/Upload-video-preview.jpg",
      description: req.body.description,
      views: req.body.views,
      likes: req.body.likes,
      duration: req.body.duration,
      video: req.body.video,
      timestamp: Date.now(),
      comments: req.body.comments || [],
    };

    videos.push(newVideo);

    await fs.writeFile("data/videos.json", JSON.stringify(videos, null, 2));

    res.status(201).json({
      message: "New video added successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Error adding new video", error);
    res.status(500).json({ error: "An error occurred while adding the video" });
  }
});

export default router;

