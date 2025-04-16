# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lock
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (if any, mcp-server uses stdio)
EXPOSE 8080 

# Command to run the application
CMD ["bun", "run", "mcp-server"]