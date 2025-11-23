# Migration Guide: Unified Frontend & Backend

## What Changed

The frontend and backend have been combined into a single unified project for easier deployment and development.

## New Structure

```
ai-code-reviewer/
├── client/              # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   └── vite.config.js
├── src/                 # Backend (Express)
│   ├── routes/
│   ├── controller/
│   └── services/
├── server.js            # Main server (serves both API and frontend)
├── package.json         # Unified dependencies
└── .env                 # Environment variables
```

## Setup Instructions

### 1. Install Dependencies

From the root directory:
```bash
npm install
```

This will install all dependencies for both frontend and backend.

### 2. Environment Setup

Create a `.env` file in the root directory:
```env
GOOGLE_GEMINI_KEY=your_gemini_api_key_here
PORT=3000
NODE_ENV=development
```

### 3. Development Mode

Run both frontend and backend together:
```bash
npm run dev
```

This will:
- Start the backend server on `http://localhost:3000`
- Start the frontend dev server on `http://localhost:5173`
- Frontend will proxy API requests to the backend

### 4. Production Build

Build and run in production mode:
```bash
npm run build
npm start
```

This will:
- Build the React app to `client/dist/`
- Serve the frontend as static files from Express
- All requests go through port 3000

## Key Changes

1. **API Paths**: Frontend now uses relative paths (`/ai/get-review`) instead of absolute URLs
2. **CORS**: Automatically configured for same-origin in production
3. **Vite Proxy**: Development mode uses Vite proxy for API requests
4. **Unified Scripts**: Single `npm run dev` command runs everything

## Old vs New

### Before (Separate Projects)
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### After (Unified)
```bash
# Single command
npm run dev
```

## Deployment

For production deployment:
1. Set `NODE_ENV=production` in `.env`
2. Run `npm run build`
3. Run `npm start`
4. The server serves both API and frontend on port 3000

## Notes

- The old `backend/` and `frontend/` folders are kept for reference but are no longer used
- All new development should use the `client/` and `src/` folders
- The `.gitignore` has been updated to ignore both old and new node_modules

