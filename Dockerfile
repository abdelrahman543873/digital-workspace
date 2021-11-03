FROM node:15

WORKDIR /app

COPY ./ /app

RUN yarn

ENV MONGO_DB=mongodb://digital-workspace-db:27017

EXPOSE 3000

CMD [ "yarn", "start" ]