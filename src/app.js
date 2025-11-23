import express from 'express'
import cors from 'cors'
import aiRouter from './routes/ai.routes.js'

export const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// CORS configuration - allow same origin in production, multiple origins in development
const NODE_ENV = process.env.NODE_ENV || 'development'
const corsOptions = {
  origin: NODE_ENV === 'production'
    ? true // Allow same origin in production
    : [
        "https://ai-code-reviewer-manjeetmathurs-projects.vercel.app",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
      ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

// API routes
app.use('/ai', aiRouter)
