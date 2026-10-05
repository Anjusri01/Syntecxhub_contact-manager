import UserModel from '../models/User.js'
import express from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: "../config/.env" })

const Register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;
    try {
        const userExist = await UserModel.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                errors: [{ msg: 'Email is already registered!' }],
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ success: true, msg: "Account Created Successfully!" })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: err.message })
    }
};

const Login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        const userExist = await UserModel.findOne({ email })
        if (!userExist) {
            return res.status(400).json({
                errors: [{ msg: 'User Not Registered' }],
            });
        }

        const isPasswordOK = await bcrypt.compare(password, userExist.password)
        if (!isPasswordOK) {
            return res.status(400).json({
                errors: [{ msg: 'Incorrect Password' }],
            });
        }
        const secretKey = process.env.JWT_SECRET_KEY || 'fallback_secret_key';
        const token = jwt.sign({ _id: userExist._id }, secretKey, { expiresIn: "3d" })
        const user = { ...userExist._doc, password: undefined }
        return res.status(200).json({ success: true, user, token })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
};

export { Register, Login }
