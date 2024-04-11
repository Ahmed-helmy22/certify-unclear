FROM ghcr.io/puppeteer/puppeteer:22.6.4

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

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Adjust permissions
USER root
RUN chmod -R 755 /usr/src/app

# Install dependencies
RUN npm ci

# Switch back to non-root user
USER node

# Copy the rest of the application files
COPY . .

# Run npm commands with elevated privileges
CMD sudo npm i && cd client && sudo npm i && sudo npm run build
