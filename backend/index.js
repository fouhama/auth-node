import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/config.js';
import authRoute from './Routes/auth.route.js';
dotenv.config();
const app = express()
app.use(express.json())

app.use('/api/auth',authRoute)


const port = process.env.PORT || 5000
app.listen(port, () => { 
    connectDB();
    console.log(`http://localhost:${port}`);
    
});