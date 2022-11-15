FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000
# required for docker desktop port mapping

CMD ["npm", "run", "dev"]

#* docker build -t myapp:v1 .
#* docker run --name myapp_c1 -p 4000:4000 -d --rm myapp:v1
#*  docker run --name myapp_c_nodemon -p 4000:4000 --rm -v /Users/hughherschell/Documents/codes/learning/docker/api:/app -v /app/node_modules  myapp:nodemon