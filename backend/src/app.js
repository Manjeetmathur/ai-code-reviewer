import express from 'express'
import cors from 'cors'
import aiRouter from './routes/ai.routes.js'
export const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
       origin:"https://ai-code-reviewer-manjeetmathurs-projects.vercel.app"
       
}))

app.use('/ai',aiRouter)
