# Application Run Configuration

## Overview
The application has been configured to automatically build and then start the production server when running `npm start`.

## Available Scripts

### Production Mode

#### `npm start`
- **Automatically runs**: `npm run build` first (via `prestart` hook)
- **Then runs**: Express server in production mode
- **Port**: 8080 (or PORT environment variable)
- **Serves from**: `dist/` directory (webpack build output)

```bash
npm start
```

#### `npm run start:prod`
- **Runs**: Express server in production mode only (skips build)
- **Use case**: When you've already built and just want to restart the server

```bash
npm run start:prod
```

#### `npm run build`
- **Runs**: Webpack production build
- **Output**: Creates optimized bundles in `dist/` directory

```bash
npm run build
```

### Development Mode

#### `npm run dev`
- **Runs**: Webpack dev server with hot reload
- **Port**: 8080
- **Features**: Hot Module Replacement (HMR), fast refresh

```bash
npm run dev
```

## How It Works

1. **`npm start` execution flow**:
   ```
   npm start
   ↓
   prestart hook runs automatically
   ↓
   npm run build (creates dist/ folder)
   ↓
   cross-env NODE_ENV=production node src/app.js
   ↓
   Express server starts serving from dist/
   ```

2. **Production server** (`src/app.js`):
   - Detects `NODE_ENV=production`
   - Serves static files from `dist/` directory
   - Uses Express static middleware
   - Port: 8080 (configurable via PORT env variable)

3. **Development server**:
   - Uses webpack-dev-server
   - Provides hot reload and fast refresh
   - No build step required

## Environment Variables

- **PORT**: Server port (default: 8080)
- **NODE_ENV**: Set to `production` for production mode
- **ENV**: Environment type (DEV/PROD)

## Docker Usage

The Dockerfile uses `npm run build` during image build and `CMD ["node", "src/app.js"]` at runtime, which automatically sets `NODE_ENV=production`.

## Port Configuration

- **Development**: 8080 (webpack-dev-server)
- **Production**: 8080 (Express server)
- **Docker**: 8080 (exposed port)

## File Structure

```
dist/                    # Production build output (created by npm run build)
├── app.main.js         # Main application bundle
├── app.main.css        # Main stylesheet
├── images/             # Static images
└── index.html          # Generated HTML

src/
└── app.js              # Express server (serves dist/ in production)
```

## Troubleshooting

### Build fails
- Check for webpack errors
- Ensure all dependencies are installed: `npm install`
- Try cleaning: `npm run clean && npm run build`

### Server won't start
- Ensure build completed successfully
- Check if port 8080 is available
- Verify `dist/` directory exists

### Want to skip build
- Use `npm run start:prod` if build already exists
- Or run `npm run build` separately, then `npm run start:prod`

