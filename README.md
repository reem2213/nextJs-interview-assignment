This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
create the project using this command:
npx create-next-app@latest frontend --typescript 

First, run the development server:

## install dependencies:
npm install
```bash
run the project:
npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

npm install axios 
for the APIs


setup docker
install docker desktop:
https://docs.docker.com/desktop/setup/install/windows-install/

add docker file containing the following:
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


build and run :
docker build -t nextjs-app . 
docker run -p 3000:3000 nextjs-app     






