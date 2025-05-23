import { Router } from "express"
import { body } from "express-validator"
import { createAccount, getAuthUser, login, updateProfile } from "../handlers"
import { handleInputErros } from "../middleware/valiadtion"
import { authenticate } from "../middleware/auth"

const router = Router()

//Auth and register
router.post('/auth/register', 
    body('handle').notEmpty().withMessage('Handle cannot be empty'),
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').isEmail().withMessage('Invalid e-mail'),
    body('password').isLength({min: 8}).withMessage('Password must be eight characters long'),
    handleInputErros,
    createAccount)

router.post('/auth/login', 
    body('email').isEmail().withMessage('Invalid e-mail'),
    body('password').notEmpty().withMessage('Password is required'),
    handleInputErros,
    login)

router.get('/user',
    authenticate,
    getAuthUser)

router.patch('/user',
    body('handle').notEmpty().withMessage('Handle cannot be empty'),
    body('description').notEmpty().withMessage('Description cannot be empty'),
    handleInputErros, 
    authenticate, 
    updateProfile)



export default router
