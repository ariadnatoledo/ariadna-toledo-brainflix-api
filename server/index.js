import express from "express";
import videosRouter from "./routes/videos.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static("public")); 
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Brainflix Practice API");
});

app.use((req, res, next) => {
  console.log(req.path); 
  console.log(new Date());
  console.log("Incoming request");
  next();
});

app.use("/videos", videosRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


