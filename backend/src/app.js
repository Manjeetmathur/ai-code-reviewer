import express from 'express'
import cors from 'cors'
import aiRouter from './routes/ai.routes.js'
export const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
       origin:"http://localhost:5173"
       
}))

app.use('/ai',aiRouter)
