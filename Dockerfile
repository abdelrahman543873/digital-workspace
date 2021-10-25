FROM node:15

WORKDIR /app

COPY ./ /app

RUN yarn

ENV MONGO_DB=mongodb://digital-workspace-db:27017/digital-workspace

CMD [ "yarn", "start" ]