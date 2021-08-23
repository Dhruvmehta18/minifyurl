FROM node:14.16.0

RUN rm -r usr

RUN mkdir -p frontend-user

WORKDIR /frontend-user

COPY ./frontend-user/package.json ./

COPY ./frontend-user/yarn.lock ./

RUN yarn install --pure-lockfile

COPY ./frontend-user .

EXPOSE 3000
