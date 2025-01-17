import express from "express"
import { signin, signiup, logout, verification, forgetPassword, resetPassword } from "../Controllers/auth.controller.js"
const Route = express.Router()

Route.post('/signin', signin )
Route.post('/signup', signiup)
Route.post('/logout', logout)

Route.post('/verification-email', verification)
Route.post('/forget-password', forgetPassword)
Route.post('/reset-password/:token', resetPassword)


export default Route