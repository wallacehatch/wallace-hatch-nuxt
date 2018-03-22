FROM node:latest


ARG api_var
ARG ad_id

ENV API_URL=${api_var}
ENV AD_ID=${ad_id}

ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY . /app
WORKDIR /app

EXPOSE 3000

RUN npm install
RUN npm run build
CMD ["npm", "start"]
