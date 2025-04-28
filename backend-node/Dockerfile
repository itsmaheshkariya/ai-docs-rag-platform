FROM node:18-alpine

WORKDIR /app

# Copy package.json ONLY
COPY package.json ./

# Install dependencies without yarn.lock
RUN yarn install

# Copy application files
COPY . .

# Install ts-node-dev locally
RUN yarn add ts-node-dev --dev

# Set PATH
ENV PATH="./node_modules/.bin:$PATH"

# Expose port
EXPOSE 3000

# Start app
CMD ["ts-node-dev", "--respawn", "--transpile-only", "--require", "tsconfig-paths/register", "src/index.ts"]
