import express from "express"
import 'dotenv/config'
import router from "../../routes/router"
import { connectDB } from "../db/db"

const app = express()

connectDB()

//Read data
app.use(express.json())



app.use('/', router)

export default app