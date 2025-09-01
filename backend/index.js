import express from 'express'
import connectDb from './db/db.js'
import router from './routes/userRoute.js'
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config({})

const port = process.env.PORT || 5000
// const MONGO_URI = process.env.MONGO_URI
const app = express();
app.use(express.json())

const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true,
}

app.use(cors(corsOptions));
app.use('/api',router);


connectDb()
app.listen(port,()=>{console.log(`server stated at port: ${port}`)})