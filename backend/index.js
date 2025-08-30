import express from 'express'
import connectDb from './db/db.js'
import router from './routes/userRoute.js'
import todoRouter from './routes/todoRoute.js';



import cors from "cors";


import dotenv from 'dotenv'

dotenv.config({})

const port = process.env.PORT || 5000
// const MONGO_URI = process.env.MONGO_URI
const app = express();
app.use(express.json())
app.use(cors());
app.use('/api',router);
app.use('/api',todoRouter);


connectDb()
app.listen(port,()=>{console.log(`server stated at port: ${port}`)})