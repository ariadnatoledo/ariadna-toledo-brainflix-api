import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("data/videos.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading data from file", err);
      return res.status(500).json({ error: "Error reading file" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error("Error parsing JSON data", error);
      res.status(500).json({ error: "Error parsing JSON data" });
    }
  });
});

router.get("/:id", (req, res) => {
  fs.readFile("data/videos.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading data from file", err);
      return res.status(500).json({ error: "Error reading file" });
    }

    try {
      const jsonData = JSON.parse(data);
      const foundVideo = jsonData.find((video) => video.id === req.params.id);
      if (foundVideo) {
        res.json(foundVideo);
      } else {
        res.status(404).json({ error: "Video not found" });
      }
    } catch (error) {
      console.error("Error parsing JSON data", error);
      res.status(500).json({ error: "Error parsing JSON data" });
    }
  });
});

export default router;



