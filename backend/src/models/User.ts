import mongoose, { Schema } from "mongoose"
import { IUser } from "../interfaces/User"

const userSchema = new Schema({
    handle: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User