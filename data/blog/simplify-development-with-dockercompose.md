---
title: Simplify Development with Docker-Compose
date: '2021-04-30'
tags: ['development', 'devops', 'docker']
draft: false
summary: 'Spin-up a development evironment with a single command'
images: []
---

## Intro

In my previous post, I outlined how to go about distributing automated tests by using Docker Compose. In this post, I will focus on using Docker Compose for another purpose - to spin up a local development evironment (specifically, for a MERN web application).

By using Docker Compose, a developer can really simplify their enviroment - most notably, with regard to terminal sessions, tcp ports, and processes. All of the stuff that you don't really "see". Once configured, Docker Compose takes care of all of these things for us, making it much easier to manage. Never get a `port:3000 is already in use` error again!

## Dockerfile

Before getting to the Docker Compose portion, it is useful to have a Dockerfile for each part of your application (typically a client & a server). A Dockerfile will be used by Docker Compose in order to create a container. Technically the Dockerfile if a "blueprint" that is used to create an "Image" and that Image is them run by a container. To get started, add a `Dockerfile` to each part of your project (server & client).

```
.
├── client
│   └── Dockerfile
└── server
    └── Dockerfile
```

- Client Dockerfile

```
FROM node:14-alpine

WORKDIR /usr/src/client

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn","start"]
```

- Server Dockerfile

```
FROM node:14-alpine

WORKDIR /usr/src/server

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 5000

RUN npm install -g nodemon

CMD [ "nodemon", "index.js" ]
```

Since this example is building out a MERN application, the two sides a fairly similiar in terms of underlying tech (i.e. node.js).

Once we've got our Dockerfiles, we can move on to creating a `docker-compose.yml` file that will reference these files.

### Docker Compose

In order to successfully run a MERN application, we need to have a client development server running, a backend (node) server running, and a database instance running. Docker Compose is used to build / run all of these pieces in individual containers and then "glues" them all together so that the whole thing works. Magic!

Let's jump into a `docker-compose.yml` file and then break it down. For a common MERN application, this file should look something like:

```yaml
version: '3'

services:
  react-client:
    build:
      context: ./client
    container_name: social-app_react-client
    ports:
      - '3000:3000'
    volumes:
      - ./client:/usr/src/client
      - /usr/src/client/node_modules
    stdin_open: true
    depends_on:
      - api-server
    networks:
      - mern-app
  api-server:
    build:
      context: ./server
    container_name: social-app_api-server
    ports:
      - '5000:5000'
    volumes:
      - ./server:/usr/src/server
    networks:
      - mern-app
    depends_on:
      - mongo
  mongo:
    image: mongo:4.4.5-bionic
    container_name: mongo-db
    ports:
      - '27017:27017'
    env_file: .env
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: ${MONGO_INITDB_DATABASE}
    volumes:
      - ./data:/data/db
    networks:
      - mern-app
networks:
  mern-app:
    driver: bridge
```

The three key components here are the "services" listed - the frontend `react-client`, the backend `api-server`, and the database `mongo`. Within each service, we are doing the following:

- `build` - tells docker compose where to look for the Dockerfile needed for the container (ex.: `context: ./client`)
- `container_name` - pretty clear, names the container (this is vital for the MongoDB connection later on)
- `ports` - maps the container ports to the host ports (with `react-client` for example, going to `http://localhost:3000` will get you the frontend)
- `volumes` - in order to leverage hot-reloading and persistent data (i.e. data with remain even after container is stopped/removed) we need to define volumes. This line for example - `./client:/usr/src/client` is basically saying use whatever is in the host machine's clinet directory as the content of the container client directory as well - furthermore, this will automatically pick-up changes made. So the host and container are always in sync by using volumes. When used with the `mongo` service, volumes also ensure that data is persistent - it is stored on the host (here in `./data`) and the container then accesses this data at `/data/db`.
- `networks` - this is useful if you've got several containers / compose configurations running at once - it helps ensure only the desired containers are talking to each other.
- `environment` - for the `mongo` service we define some evironment variables that will be used by mongo when the container is spun up to create a root, admin user that will allow us to use for connection and read/write data later on.

Now that the `docker-compose.yml` file is all set, it is time to put it to work. In order to start all of these containers, issue:
`docker-compose up --build`. This command will build the images, start the containers, and run the service. You should see some familiar console out (since we did not pass the `-d` flag) related to the servers & db running. At this point, if there are no errors, you should be able to go to `http://localhost:3000` to view your app running (or `http://localhost:5000/graphql` to get to the GraphQL server playgroud). However, one common issue I run into is around the server connection to the Mongo database - it is crucial to have the connection string align exactly with what we setup in the `docker-compose` file. For example, using mongoose, we'll have a line like this in the server's `index.js` file:

```
mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true,}) ...
```

The `MONGODB` variable will be defined as:

```
const MONGODB: `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
```

`DB_USER`, `DB_PASS`, & `DB_NAME` all need to match what we used here:

```
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: ${MONGO_INITDB_DATABASE}
```

The easy one to miss and cause issues though is `DB_HOST` - this needs to be the **container name** (so in the example above: `mongo-db`).

Once docker-compose is running successfully, you can continue development as normal and just use: `docker-compose up` & `docker-compose down` to spin-up and teardown your developemnt environment. Furthermore, if you need to switch machines or collaborate with someone else, this method ensure that the development environment defined will always work elsewhere.
