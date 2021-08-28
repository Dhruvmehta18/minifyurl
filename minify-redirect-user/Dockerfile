FROM node:14.16.0

RUN mkdir -p /usr/src/minify-redirect-user

WORKDIR /usr/src/minify-redirect-user

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

EXPOSE 3001
