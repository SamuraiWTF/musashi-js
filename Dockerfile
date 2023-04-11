# Use the official Node.js image as the base
FROM node:18

# Set the working directory
WORKDIR /opt/targets/musashi

# Copy package.json and package-lock.json into the container
COPY package.json .

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Set environment variables using .env file
COPY sample.env /opt/targets/musashi/.env

# Expose necessary ports
EXPOSE 3020 3021 8443 3030 3031 3041

# Start the application
CMD ["yarn", "start"]