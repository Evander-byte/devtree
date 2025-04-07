import type {Request, Response} from 'express'
import slug from 'slug'
import User from "../models/User"
import { hasPassword } from '../utils/auth'


export const createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const userExist = await User.findOne({email})

    if(userExist) {
        const error = new Error('The email already exist')
        res.status(409).json({error: error.message})
        return
    }

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({handle})
    if(handleExist){
        const error = new Error('Username no avalible')
        res.status(409).json({error: error.message})
        return
    }

    const user = new User(req.body)
    user.handle = handle
    user.password = await hasPassword(password)
    await user.save()
    res.status(201).send('Success register')
}