# Stage 1: Build the React application
FROM --platform=linux/amd64 node:16-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
# RUN npm install -g yarn
RUN yarn install

# Copy local code to the container image
COPY . ./

# Build the application
RUN yarn build

# Stage 2: Serve the application from Nginx
FROM --platform=linux/amd64 nginx:1.21-alpine

# Copy the build artifacts from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom nginx configuration (if you have one)
 COPY skazhi_be.nginx.conf /etc/nginx/conf.d/default.conf

# Expose the listening port
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
