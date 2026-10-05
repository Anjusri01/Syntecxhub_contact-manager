import express from 'express'
import { Register, Login } from '../controllers/userControllers.js';
import { AddContact, GetContacts } from '../controllers/contactControllers.js';
import { VerifyUser } from '../middleware/verifyUser.js'; 
import { body } from 'express-validator'

const router = express.Router()

// Authentication Routes
router.post('/register', [
     body('name').trim().notEmpty().withMessage("Name Should Not be Empty"), 
     body('email').trim().notEmpty().withMessage("Email Should not be Empty").isEmail().withMessage("Invalid Email !!"),
     body('password').trim().notEmpty().withMessage("Password Should Not be Empty").isLength({ min: 5, max: 30 }).withMessage("Password Length Should be 5-30")
], Register)

router.post('/login', [
     body('email').trim().notEmpty().withMessage("Email should not be empty").isEmail().withMessage("Invalid Email !!"),
     body('password').trim().notEmpty().withMessage("Password should not be empty")
], Login)

// Secure Contact Routes
router.post('/add-contact', VerifyUser, [
    body('name').trim().notEmpty().withMessage("Contact Name shouldn't be empty"),
    body('email').trim().notEmpty().withMessage("Contact Email shouldn't be empty").isEmail().withMessage("Invalid Email!"),
    body('phone').trim().notEmpty().withMessage("Phone Number shouldn't be empty")
], AddContact)

router.get('/contacts', VerifyUser, GetContacts)

export const Router = router;
