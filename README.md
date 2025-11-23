# AI Code Reviewer

A unified full-stack application for AI-powered code reviews. The frontend and backend are combined into a single project for easier deployment and development.

## Features

- 🤖 AI-powered code reviews using Google Gemini
- 💻 Multi-language support (JavaScript, TypeScript, Python, Java, CSS, HTML)
- 🎯 Multiple review modes (General, Security, Performance, Best Practices)
- 📋 Code templates for quick start
- 📝 Review history with localStorage
- 📤 Export reviews as Markdown
- 📋 Copy code and reviews to clipboard
- 🎨 Modern UI with Tailwind CSS

## Project Structure

```
ai-code-reviewer/
├── client/          # Frontend React application
│   ├── src/
│   ├── public/
│   └── vite.config.js
├── src/             # Backend Express application
│   ├── routes/
│   ├── controller/
│   └── services/
├── server.js        # Main server file
└── package.json     # Unified dependencies
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file in root:**
   ```env
   GOOGLE_GEMINI_KEY=your_gemini_api_key
   PORT=3000
   NODE_ENV=development
   ```

3. **Development mode:**
   ```bash
   npm run dev
   ```
   This runs both frontend (Vite on port 5173) and backend (Express on port 3000) concurrently.

4. **Production build:**
   ```bash
   npm run build
   npm start
   ```
   This builds the frontend and serves it from the Express server on port 3000.

## Available Scripts

- `npm run dev` - Run both frontend and backend in development mode
- `npm run dev:server` - Run only the backend server
- `npm run dev:client` - Run only the frontend dev server
- `npm run build` - Build the frontend for production
- `npm start` - Start the production server
- `npm run preview` - Build and start production server

## API Endpoints

- `POST /ai/get-review` - Get AI code review
  - Body: `{ code: string, reviewMode?: string, language?: string }`
  - Returns: `{ result: string }`

## Environment Variables

- `GOOGLE_GEMINI_KEY` - Your Google Gemini API key (required)
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

## Technologies

- **Frontend:** React, Vite, Tailwind CSS, Prism.js
- **Backend:** Express.js, Google Gemini AI
- **Code Editor:** react-simple-code-editor
- **Markdown:** react-markdown

## License

ISC

