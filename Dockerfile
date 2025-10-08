# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app


COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build app
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine AS runner

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

USER nextjs
WORKDIR /app

# Copy production dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000


CMD ["npm", "start"]