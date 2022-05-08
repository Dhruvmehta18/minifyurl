FROM node:14.16.0

# Create and define the node_modules's cache directory.

RUN mkdir -p /usr/src/node-app
WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

RUN yarn add --dev jest

COPY entrypoint_test.sh ./

RUN ["chmod", "777", "/usr/src/node-app/entrypoint_test.sh"]

COPY --chown=node:node . .

EXPOSE 3001
