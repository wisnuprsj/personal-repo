FROM node:14-alpine

WORKDIR /app/backend

COPY package.json .

RUN npm install

COPY . .

ARG DEFAULT_PORT=80

ARG DEFAULT_ENV=dev

ENV LM_BE_PORT $DEFAULT_PORT

EXPOSE $LM_BE_PORT 

CMD [ "npm", "run", $DEFAULT_ENV ]