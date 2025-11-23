import { app } from "./src/app.js";
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
  path: './.env'
})

const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

// Serve static files from the React app in production
if (NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client', 'dist')
  
  // Serve static files
  app.use(express.static(clientBuildPath))
  
  // Handle React routing - return all requests to React app
  // API routes are handled by /ai/* in src/app.js, so we only need to catch non-API routes
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes (they should be handled by Express routes)
    // Only serve index.html for frontend routes
    res.sendFile(path.join(clientBuildPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
  console.log(`Environment: ${NODE_ENV}`)
  if (NODE_ENV === 'development') {
    console.log(`Frontend dev server should run on http://localhost:5173`)
    console.log(`Backend API available at http://localhost:${PORT}`)
  } else {
    console.log(`Application available at http://localhost:${PORT}`)
  }
})

