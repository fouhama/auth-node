import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import User from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendResetPassEmail, sendVerificationEmail, sendWelcomeEmail, sendConfirmChangePassEmail } from '../mailtrap/email.js';
export const signiup = async (req, res) => {
    const { email, password , name} = req.body;
    try {
        if (!email || !password || !name) { 
            throw new Error(' Please provide all required fields');
        }          
        const checkUserExist = await User.findOne({ email })
        if (checkUserExist) { 
            return res.status(400).json({ success:false , message: "Email already exist" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const codeVerfication = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email, password: hashPassword,
            name,
            verificationToken: codeVerfication,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await user.save();

        generateTokenAndSetCookie( res , user._id );
        
        await sendVerificationEmail(user.email, codeVerfication);


        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined 
            }
        })

        } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verification = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid verification code or expired" })
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()
        sendWelcomeEmail(user.email, user.name) 
        return res.status(200).json({ success: true, message: "Email verified successfully", user: { ...user._doc, password: undefined } })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message, user: {...user._doc , password: undefined } })
    }
    

}
export const signin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) { 
            return res.status(400).json({ success: false, message: "Invalid email or password  " })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({ success: false, message: "Invalid email or password " })
        }
        generateTokenAndSetCookie(res, user._id)
        user.lastLogin = new Date
        await user.save()
        return res.status(200).json({
            success: true, message: "Logged in successfully",
            user : {...user._doc , password : undefined }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
        
    }

}

export const logout = async(req, res) => {
    res.clearCookie('token')
    return res.status(200).json({ success: true, message: "Logged out successfully" })
}

export const forgetPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Email not found" })
        }
        const restToken = await crypto.randomBytes(20).toString('hex')
        user.resetPasswordtToken = restToken
        user.resetPsswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000
        await user.save()
        sendResetPassEmail(user.email, restToken)
        return res.status(200).json({ success: true, message: "Email sent to reset password" })
    } catch (error) {
        console.log( error.message );
        return res.status(500).json({success: false, message: error.message})
    }
}
export const resetPassword = async (req, res) => { 
    const token = req.params.token 
    const { password } = req.body
    try {
        const user = await User.findOne({
            resetPasswordtToken: token,
            resetPsswordExpiresAt: {$gt: Date.now()}
        })
        if (!user) {
            return res.status(400).json({success: false, message: "Invalid token or expired token"})
        }
        user.password = await bcrypt.hash(password, 10)
        user.resetPasswordtToken = undefined
        user.resetPsswordExpiresAt = undefined
        await user.save()
        await sendConfirmChangePassEmail(user.email)
        return res.status(200).json({ success: true, message: "Password reset successfully" ,user: {...user._doc , password: undefined }})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message })
    }
}