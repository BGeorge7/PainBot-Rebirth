FROM node:16-alpine
# Create app directory
WORKDIR /PainBot-Rebirth

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# tzdata used to set the time zone of the container

#RUN apk update && apk install tzdata
RUN apk update && apk add tzdata

ENV TZ="America/Chicago"
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

CMD [ "node", "index.js" ]