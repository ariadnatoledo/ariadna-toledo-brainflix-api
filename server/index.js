import express from 'express'
import videosRouter from "./routes/videos.js"

//dotenv
//Router


const app = express();
 const PORT = process.env.PORT || 8080

 app.get("/", (req,res) => {
    res.send("Welcome to Brainflix API")
 })

//Middleware
app.use("/api", videosRouter)



//App.listen always goes at the very end of my code 
 app.listen(PORT, () => {
    console.log(`Port listening to ${PORT}`)
 })