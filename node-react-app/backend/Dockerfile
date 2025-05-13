# 1) Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev


# 2) Build final image
FROM node:20-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# default RabbitMQ URL (overridable by env)
ENV RABBIT_URL=amqp://rabbitmq:5672 \
    PORT=4000
EXPOSE ${PORT}
CMD ["node", "index.js"]