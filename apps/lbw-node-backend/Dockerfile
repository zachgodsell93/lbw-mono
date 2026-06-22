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
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# DigitalOcean App Platform builds this Dockerfile with apps/lbw-node-backend
# as the build context, so copy the backend package files from the context root.
COPY package.json package-lock.json ./

# Install dependencies, including dev dependencies needed for TypeScript build
RUN npm ci --include=dev

# Copy backend application code
COPY . .

# Build application
RUN npm run build

# Remove development dependencies from the final dependency tree
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Install curl for health checks
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl && \
    rm -rf /var/lib/apt/lists/*

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3001
CMD [ "node", "./dist/app.js" ]
