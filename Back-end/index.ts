import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import "./src/connectPg";
import router from "./src/routers/index"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

app
  .use(
    cors({
      origin:"*",
      methods: ["GET", "POST", "PUT", "DELETE"],  
      allowedHeaders: ["Content-Type", "origin"],
    })
  )
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
