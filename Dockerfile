# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Set environment variables for configuration
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port on which the app will run
EXPOSE $PORT

# Set a default command to start the app
CMD ["npm", "start"]