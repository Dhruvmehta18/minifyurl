FROM node:14.16.0

RUN mkdir -p /usr/src/minify-auth-service

WORKDIR /usr/src/minify-auth-service

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

EXPOSE 3002
