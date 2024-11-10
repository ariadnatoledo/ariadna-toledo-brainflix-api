import express from "express";
import fs from "fs/promises";
import videosRouter from "./routes/videos.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static("public")); // allows serving files from the public folder
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Brainflix Practice API");
});

app.use((req, res, next) => {
  console.log(req.path); // Logs the path
  console.log(new Date());
  console.log("Incoming request");
  next();
});

app.use("/videos", videosRouter);

// POST request to add a new video to the existing videos.json array
app.post("/videos", async (req, res) => {
  console.log("Posting data to /videos");
  console.log(req.body);

  try {
    const data = await fs.readFile("data/videos.json", "utf-8");
    const videos = JSON.parse(data); // Parse JSON data to an array

    const videoExists = videos.some((video) => video.id === req.body.id);

    if (videoExists) {
      return res.status(400).json({
        message: "This video already exists",
      });
    }

    const newVideo = req.body;
    videos.push(newVideo);

    await fs.writeFile("data/videos.json", JSON.stringify(videos, null, 2));

    res.status(201).json({
      message: "New video added successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Error adding new video", error);
    res.status(500).json({
      error: "An error occurred while adding the video",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});













// Below is my old code BUT functional still

// import express from "express";
// import videosRouter from "./routes/videos.js";
// import cors from "cors";

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Welcome to the Brainflix Practice API");
// });

// app.use((req, res, next) => {
//   console.log(req.path); // logs the path that was visited
//   console.log(new Date());
//   // potentially write to a file the req path and time
//   console.log("incoming request");
//   next();
// });

// app.use(express.json()); // allow access to req.body to post data

// app.use("/videos", videosRouter);

// app.post("/videos", (req, res) => {
//    console.log("posting data to /videos")
//    console.log(req.body);
//    res.send("you have added a new video");
// });

// app.listen(PORT, () => {
//   console.log(`Port listening to ${PORT}`);
// });
