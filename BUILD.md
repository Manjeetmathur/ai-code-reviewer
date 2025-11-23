# Build Instructions for Render

## Build Process

The build process requires dependencies to be installed in both the root and client directories.

### Automatic Build (Recommended)

The `package.json` includes a `postinstall` script that automatically installs client dependencies after root dependencies are installed.

### Manual Build Steps

If you need to build manually:

```bash
# 1. Install root dependencies
npm install

# 2. Install client dependencies
cd client && npm install && cd ..

# 3. Build the client
npm run build

# 4. Start the server
npm start
```

### Render Configuration

For Render deployment, use these settings:

**Build Command:**
```bash
npm install && cd client && npm install && cd .. && npm run build
```

**Start Command:**
```bash
npm start
```

**Environment Variables:**
- `NODE_ENV=production`
- `PORT=10000` (or your assigned port)
- `GOOGLE_GEMINI_KEY=your_api_key`

### Troubleshooting

If you see "Failed to resolve import" errors:

1. Ensure `react-router-dom` is in `client/package.json` dependencies
2. Run `cd client && npm install` manually
3. Check that `client/node_modules` exists and contains `react-router-dom`

