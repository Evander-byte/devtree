import type {Request, Response} from 'express'
import { validationResult } from "express-validator"
import slug from 'slug'
import User from "../models/User"
import { checkPassword, hasPassword } from '../utils/auth'
import { generateJWT } from '../utils/jtw'


export const createAccount = async (req: Request, res: Response) => {

    //handle errors
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return 
    }
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

export const login = async (req: Request, res: Response) => {
    // handle errors
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return
    }

    //user exist
    const { email, password } = req.body
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('The email is not associated with any account')
        res.status(401).json({error: error.message})
    }

    //check password
    const isPasswordCorrect = await checkPassword(password, user.password)
    if(!isPasswordCorrect){
        const error = new Error('Incorrect Password')
        res.status(401).json({error: error.message})
        return 
    }
    const token = generateJWT({id: user._id})

    res.send(token)

    
}

export const getAuthUser = async (req: Request, res: Response) => {
    res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { description } = req.body
        const handle = slug(req.body.handle, '')
        const handleExists = await User.findOne({handle})
        if(handleExists && handleExists.email !== req.body.email){
            const error = new Error('Nombre de usuario no disponible')
            res.status(409).json({error: error.message})
            return
        }

        //Actualizar el usuario
        req.user.description = description
        req.user.handle = handle
        await req.user.save()
        res.status(200).json('Información actualizada correctamente')
    } catch (error) {
        const errors = new Error('Hubo un error')
        res.status(500).json({error: error.message})
        return 
    }
}