# =========================
# Stage 1 - Build Angular
# =========================
FROM node:22 AS build

# Working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project
COPY . .

# Build Angular app
RUN npm run build

# =========================
# Stage 2 - Nginx Server
# =========================
FROM nginx:alpine

# Copy Angular build output to nginx folder
COPY --from=build /dist/front/browser /usr/share/nginx/html

# Expose nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
