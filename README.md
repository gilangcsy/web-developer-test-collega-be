# Web Developer Test Collega Back End

# Environment Variables
This project uses the following environment variables:

| Name                          | Description                         | Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|APP_PORT           | PORT used to run the server           | "3001"      |
|APP_VERSION          | Currently running API version          | "/v1"      |
|APP_SECRET_KEY          | Secret key for JWT         | "jwt-secret-key"      |
|DB_HOST          | HOST name of the server that we used         | "localhost"      |
|DB_USER          | USER name of the server  that we used         | "postgres"      |
|DB_PASSWORD          | PASSWORD of the server that we used       | "postgres"      |
|DB_NAME          | Database name        | "collega"      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) versi 16.13.1


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Create an .env file and adjust it as in the Environment Variables section. For database credentials, please adjust to the server you are using.
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:3001`

- API Document endpoints

  Import via Postman : https://www.getpostman.com/collections/885c15b286b149f3b93b

