import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/config.js';
import authRoute from './Routes/auth.route.js';
import cookieParser from 'cookie-parser'
import path from "path"
import cors from "cors"
dotenv.config();
const app = express()
const __dirname  =path.resolve()
app.use(cors({
    origin:"http://localhost:5173", credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/dist')))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend','dist', 'index.html'))
    })
}



const port = process.env.PORT || 5000
app.listen(port, () => { 
    connectDB();
    console.log(`http://localhost:${port}`);
    
});