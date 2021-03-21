# MERN Stack Boilerplate

MongoDB | Express | React | Node

## Getting Started
A Docker image is used for the MongoDB instance. If you do not have Docker installed on your machine you can get started with [Docker Desktop](https://www.docker.com/products/docker-desktop).

If you  prefer to not use Docker, the application can be configured to point to a remote MongoDB cluster by changing the `MONGO.URI` constant in `config/dev.js` and/or `config/prod.js`. 
```bash
# install dependencies
npm run bootstrap

# assumes docker desktop is installed
# starts mongodb container
npm run database

# starts api and client
npm run app
```



