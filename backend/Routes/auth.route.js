import express from "express"
import { signin, signiup, logout, verification, forgetPassword, resetPassword,checkToken } from "../Controllers/auth.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
const Route = express.Router()

Route.get('/check-auth', verifyToken, checkToken)
Route.post('/signin', signin )
Route.post('/signup', signiup)
Route.post('/logout', logout)

Route.post('/verification-email', verification)
Route.post('/forget-password', forgetPassword)
Route.post('/reset-password/:token', resetPassword)


export default Route