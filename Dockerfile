FROM node:16-alpine3.15 as deps
WORKDIR /dependencies
LABEL key="dependencies"
COPY package*.json ./
RUN npm install


FROM node:16-alpine3.15 as builder

ARG PORT
ARG POSTGRES_PASSWORD
ARG POSTGRES_USER
ARG POSTGRES_DB
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG DATABASE_URL
ARG JWT_SECRET

WORKDIR /deploy
LABEL key="builder"
COPY --from=deps /dependencies/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:16-alpine3.15 as runner

ARG PORT
ARG POSTGRES_PASSWORD
ARG POSTGRES_USER
ARG POSTGRES_DB
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG DATABASE_URL
ARG JWT_SECRET

WORKDIR /app
LABEL key="runner"
COPY package*.json ./
COPY --from=builder /deploy/prisma ./prisma
COPY --from=builder /deploy/dist ./dist
RUN npm install --production=true

EXPOSE ${PORT}
CMD ["node", "dist/src/main"]
