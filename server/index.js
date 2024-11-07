import express from 'express'

//dotenv
//Router


const app = express();
 const PORT = process.env.PORT || 8080

 app.get("/", (req,res) => {
    res.send("Welcome to Brainflix API")
 })





//App.listen always goes at the very end of my code 
 app.listen(PORT, () => {
    console.log(`Port listening to ${PORT}`)
 })