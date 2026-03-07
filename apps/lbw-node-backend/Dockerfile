# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.19.5
FROM node:${NODE_VERSION}-slim AS base

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV PORT=3001


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copy root package files for workspace install
COPY package.json package-lock.json ./

# Copy app package.json into workspace location
COPY apps/lbw-node-backend/package.json apps/lbw-node-backend/package.json

# Install dependencies for the backend workspace
RUN npm ci --workspace=lbw-node-backend --include=dev

# Copy backend application code
COPY apps/lbw-node-backend/ apps/lbw-node-backend/

# Build application
RUN npm run build --workspace=lbw-node-backend

# Remove development dependencies
RUN npm prune --omit=dev --workspace=lbw-node-backend


# Final stage for app image
FROM base

# Install curl for health checks
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl && \
    rm -rf /var/lib/apt/lists/*

# Copy built application
COPY --from=build /app /app

# Set working directory to the backend app
WORKDIR /app/apps/lbw-node-backend

# Start the server by default, this can be overwritten at runtime
EXPOSE 3001
CMD [ "node", "./dist/app.js" ]
