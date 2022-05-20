FROM node:current-alpine3.15

# Create directory that runs the app on docker
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package.json package-lock.json ./

# COPY
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Install package.json dependencies
RUN npm install
RUN npm i prisma@latest
RUN npm i @prisma/client@latest
# COPY
COPY . .

# Generate prisma client
RUN npx prisma generate

# Run and expose the server on port 4000
EXPOSE 4000

# A command to start the server

RUN ls
CMD npm run dev