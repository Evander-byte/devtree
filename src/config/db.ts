import colors from 'colors'
import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.bgGreen(`MongoDB conectado en ${url}`))
    } catch (error) {
        console.log(colors.bgRed.bold(error.message))
        process.exit(1)
    }
}