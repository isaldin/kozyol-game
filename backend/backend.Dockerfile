FROM --platform=linux/amd64 node:18.13 as build-env

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production=false

COPY . .
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --frozen-lockfile --production

#
FROM --platform=linux/amd64 node:18.13-buster-slim as prod-build

USER node

WORKDIR /home/app

ENV NODE_ENV=production
EXPOSE 8041

COPY --from=build-env /usr/src/app/dist/. ./dist
COPY --from=build-env /usr/src/app/node_modules/ ./node_modules

CMD [ "node", "dist/main.js" ]