import express from 'express'
import fs from 'fs'

const router = express.Router()

router.get("/", (req,res) => {
    fs.readFile("data/videos.json", "utf-8", 
        (err, data) => {
            if(err) {
                console.error("Error reading data from file", err)
                return res.status(500).json({
                    error: "Error reading file"
                })
            }

            try {
                const jsonData = JSON.parse(data)
                res.json(jsonData)
            } catch(error) {
                console.error("Error", error)
                res.status(500).json({error: "Error"})
            }
        }
    )
})




export default router;