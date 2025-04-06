import mongoose, { Schema } from "mongoose"
import { User } from "../interfaces/User"

const userSchema = new Schema({
    handle: {
        type: String,
        require: true,
        trim: true
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
})

const User = mongoose.model<User>('User', userSchema)
export default User