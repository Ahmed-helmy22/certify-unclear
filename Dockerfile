FROM ghcr.io/puppeteer/puppeteer:22.6.4

# Set environment variables
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    NODE_ENV=production \
    PORT=5001 \
    JWT_SECRET=mysecret \
    TIME_EXPIRED_IN=12 \
    MONOGDB=mongodb://127.0.0.1:27017/certificate \
    MONGO_ATLAS=mongodb+srv://ahmednassar855:HwzE6WCm1cR1vHrn@clustercertify.fzdrpvn.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCertify \
    CLOUD_NAME=derotfe9c \
    CLOUD_API_KEY=426975377999731 \
    CLOUD_API_SECRET=g5yCVCoOHEIjEHJ6aZSXaXd3Ilw

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Adjust ownership and permissions
USER root
RUN chown -R node:node /usr/src/app

# Switch to the non-root user
USER node

# Expose the port
EXPOSE 5001 

# Run npm commands
CMD npm i && cd client && npm i && npm run build
