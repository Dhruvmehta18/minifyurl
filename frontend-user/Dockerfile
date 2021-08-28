FROM node:14.16.0

RUN mkdir -p /usr/src/frontend-user

WORKDIR /usr/src/frontend-user

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

EXPOSE 3000
