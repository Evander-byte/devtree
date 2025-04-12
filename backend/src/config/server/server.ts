import express from "express"
import cors from 'cors'
import 'dotenv/config'
import router from "../../routes/router"
import { connectDB } from "../db/db"
import { corsConfig } from "../cors/cors"

connectDB()

const app = express()

//Cors
app.use(cors(corsConfig))

//Read data
app.use(express.json())



app.use('/', router)

export default app