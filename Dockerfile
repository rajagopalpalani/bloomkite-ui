FROM node:18-slim

# Install git for potential git-based dependencies
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Set npm configuration for faster installs
ENV NPM_CONFIG_CACHE=/tmp/.npm
ENV NPM_CONFIG_PREFER_OFFLINE=false

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
# Use --prefer-offline to use npm cache if available
RUN npm ci --prefer-offline --no-audit && \
    npm cache clean --force

# Copy only necessary files for build (better Docker layer caching)
COPY webpack.config.js ./
COPY postcss.config.js ./
COPY src ./src
COPY public ./public

# Build the production bundles with optimized settings
RUN NODE_OPTIONS="--max-old-space-size=512" npm run build

# Remove devDependencies after build to reduce image size
RUN npm prune --production && \
    rm -rf /tmp/.npm

# Expose port
EXPOSE 8080

# Set Node.js memory limits and production environment
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Start the Express production server
CMD ["node", "src/app.js"]
