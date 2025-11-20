# Step 1: Build the Vite React app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Run using Nginx
FROM nginx:stable-alpine

# Copy build output to Nginx default public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port (Railway will auto-detect)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
