FROM node:8.1.4
MAINTAINER yo@salvocanna.io

# RUN apt-get update && 
RUN npm install babel-cli@6 nodemon -g && npm update yarn -g

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# COPY package.json /usr/src/app/
# RUN npm install --production

# COPY . /usr/src/app

#ENV PORT=3000

EXPOSE 3000

# ENTRYPOINT ["npm", "start"]
CMD [ "node" ]
