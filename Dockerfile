# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Next.js project to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the Next.js app will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
