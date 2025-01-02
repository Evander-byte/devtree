import { Router } from 'express'
import {body} from 'express-validator'
import { createAccount, login } from './handlers'
import { handleInputErrors } from './middleware/validation'

const router = Router()

/* Auth and register */

router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('Handle field cannot be empty'),
    body('name')
        .notEmpty()
        .withMessage('Name field cannot be empty'),
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('password')
        .isLength({min: 8})
        .withMessage('Password must be eight characters'),
        handleInputErrors,
    createAccount
)

router.post('/auth/login', 
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('password')
        .notEmpty()
        .withMessage('Password field cannot be empty'),
        handleInputErrors,
    login
)

export default router