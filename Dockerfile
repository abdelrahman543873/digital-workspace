FROM node:15

WORKDIR /app

COPY ./ /app

RUN yarn

ENV MONGO_DB=mongodb+srv://bodi:vindiesel3@cluster0.dd7up.mongodb.net/digital-workspace?retryWrites=true&w=majority

EXPOSE 3000

CMD [ "yarn", "start" ]