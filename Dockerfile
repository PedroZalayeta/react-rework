# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20.12.2

#############################
# Backend runtime image
#############################
FROM node:${NODE_VERSION}-alpine AS backend

WORKDIR /app

COPY LibreCourseUY-backend/package*.json ./
RUN npm ci

COPY LibreCourseUY-backend .

ENV NODE_ENV=production
EXPOSE 6453

CMD ["npx", "ts-node", "server.ts"]

#############################
# Frontend build + runtime image
#############################
FROM node:${NODE_VERSION}-alpine AS frontend-build

WORKDIR /app

COPY LibreCourseUY/package*.json ./
RUN npm ci

COPY LibreCourseUY .

ARG VITE_BACKEND_URL=http://localhost:6453
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

FROM nginx:1.27-alpine AS frontend

COPY --from=frontend-build /app/dist /usr/share/nginx/html

EXPOSE 80
