import type { Request, Response } from 'express'
import {validationResult} from 'express-validator';
import slug from 'slug'
import User from "../models/User"
import { ashPwd, checkPwd } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {

    const {email, password} = req.body
    
    const userExist = await User.findOne({email})
    if(userExist){
        const error = new Error('Email has already been registered')
        res.status(409).json({error: error.message})
        return
    }
    
    const handle = slug(req.body.handle, '')

    const handleExist = await User.findOne({handle})
    if(handleExist){
        const error = new Error('Username not available')
        res.status(409).json({error: error.message})
        return
    }
    
    const user = new User(req.body)
    user.password = await ashPwd(password)
    user.handle = handle

    
    await user.save()

    res.status(200).send('Successful registration')

}

export const login = async (req: Request, res: Response) => {
    let errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return
    }

    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user){
        const error = new Error('Email not found')
        res.status(404).json({error: error.message})
        return
    }

    const isPasswordCorrect = await checkPwd(password, user.password)
    if(!isPasswordCorrect){
        const error = new Error('Incorrect password')
        res.status(401).json({error: error.message})
    }

    res.status(200).send('Auth...')

}