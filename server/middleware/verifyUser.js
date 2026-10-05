import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.js';

export const VerifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        
        if (!token) {
            return res.status(401).json({ success: false, msg: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await UserModel.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, msg: "User not found" });
        }

        req.user = user; 
        next(); 
    } catch (err) {
        return res.status(401).json({ success: false, msg: "Invalid session token" });
    }
};
