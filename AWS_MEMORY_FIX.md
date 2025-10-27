# AWS Memory Issue Fix

## Problem
The application was being killed in AWS due to memory issues (OOM killer). The container was running out of memory during build and runtime.

## Root Causes Identified
1. **Dockerfile Issues:**
   - Using Alpine base image with memory constraints
   - Running non-existent build scripts (`build:client`, `build:server`, `build:node`)
   - Running `npm start` which launches webpack-dev-server in development mode (very memory intensive)
   - No Node.js memory limits configured

2. **Configuration Issues:**
   - Webpack output path mismatch (builds to `dist/` but app serves from `public/`)
   - Inconsistent file naming between webpack build and Express app
   - No production environment configuration

## Changes Made

### 1. Updated Dockerfile
- Changed from `alpine:latest` to `node:18-slim` (more memory efficient)
- Fixed build process to use actual webpack build command
- Added Node.js memory limit: `NODE_OPTIONS="--max-old-space-size=512"`
- Properly configured to run production build with Express server
- Added `npm prune --production` to reduce final image size
- Set `NODE_ENV=production` environment variable

### 2. Fixed Webpack Configuration (webpack.config.js)
- Changed production filenames from hashed names to predictable names
  - `[name].[contenthash].js` → `app.[name].js`
  - This allows the Express app to reference the correct files
- Changed CSS filenames to match: `app.[name].css`

### 3. Updated Express App (src/app.js)
- Changed static file serving from `public/` to `dist/` directory
- Updated HTML templates to reference correct file names:
  - `/app.client.js` → `/app.main.js`
  - `/app.client.css` → `/app.main.css`

## Memory Optimization
- Node.js heap size limited to 512MB (can be adjusted based on your AWS instance size)
- Removed unnecessary development dependencies after build
- Using production-optimized builds

## How to Deploy
1. The docker build will now:
   - Install all dependencies (including dev deps for build)
   - Build the production bundle with webpack
   - Remove dev dependencies to reduce image size
   - Run the Express server in production mode

2. The container will serve the built files from the `dist/` directory

## Recommended AWS Instance Sizes
- **Minimum**: 1GB RAM (512MB for Node + system overhead)
- **Recommended**: 2GB RAM (for better performance and headroom)
- **Production**: 4GB+ RAM (for scaling and multiple containers)

## Additional Notes
- If you still experience memory issues, you can reduce `--max-old-space-size` to 384 or 256
- Monitor memory usage in CloudWatch after deployment
- Consider enabling swap on the ECS container if needed

