FROM node:10

COPY . /src
WORKDIR "/src"

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev", "&", "yarn", "dev"]