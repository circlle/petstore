FROM node:14.15.3

WORKDIR /opt/pet-server

COPY package.json ./

RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn

COPY . .

ENTRYPOINT [ "yarn" ]

CMD [ "start:dev" ]
