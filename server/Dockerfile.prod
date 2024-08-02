# Start your image with a node base image
FROM node:14

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package.json yarn.lock ./

# Install node packages
RUN yarn

# Copy the rest of the application files
COPY . .

# Expose the port on which your application listens
EXPOSE 5000

# Start the app
CMD ["yarn", "local"]