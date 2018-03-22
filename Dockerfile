FROM node:latest


ARG api_var

ENV API_URL=${api_var}

ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY . /app
WORKDIR /app

EXPOSE 3000

RUN npm install
RUN npm run build
CMD ["npm", "start"]
