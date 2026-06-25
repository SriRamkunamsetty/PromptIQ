# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app
# Copy the built frontend
COPY --from=builder /app/dist ./dist
# Copy backend files and package.json
COPY --from=builder /app/server ./server
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env* ./ 

# Install production dependencies only (express, etc)
RUN npm ci --omit=dev

# Set port for Cloud Run
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server/index.js"]
