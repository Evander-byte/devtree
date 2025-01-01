import type { Request, Response } from 'express'
import User from "../models/User"
import { ashPwd } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {

    const {email, password} = req.body
    
    const userExist = await User.findOne({email})
    if(userExist){
        const error = new Error('El usuario ya esta registrado')
        res.status(409).json({error: error.message})
        return
    }
    
    const user = new User(req.body)
    user.password = await ashPwd(password)
    
    await user.save()

    res.status(200).send('Registro creado correctamente')

}