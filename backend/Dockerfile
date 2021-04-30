FROM node:14

WORKDIR "/usr/src/app"

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
COPY wait-for-it.sh .

RUN yarn build

EXPOSE 4000

CMD ["yarn", "start"]
