# Multi-stage build for Next.js 

#stage 1
FROM node:18-alpine AS builder

WORKDIR /app


COPY package*.json ./


RUN npm ci --only=production


COPY . .

# Build 
RUN npm run build

# Stage 2
FROM node:18-alpine AS runner

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

USER nextjs

WORKDIR /app


COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules  # ← REQUIRED for `next start`


EXPOSE 3000

# env
ENV NODE_ENV=production
ENV PORT=3000


CMD ["npm", "start"]