# Use the official Node.js image as the base image
FROM node:18.16.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the React app
RUN npm run build

# Expose the port your app runs on
EXPOSE 80

# Start the application
CMD ["npm", "start"]
