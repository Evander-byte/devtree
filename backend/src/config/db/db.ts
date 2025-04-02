
import Colors from "colors"
import mongoose from "mongoose"

export const connectDB = async (): Promise<void> => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.host}:${connection.port}`
        console.log(Colors.cyan.bold(`MongoDB Conectado: ${url}`))
    } catch (error) {
        console.log(Colors.bgRed.white.bold(error.message))
        process.exit(1)
    }
}


