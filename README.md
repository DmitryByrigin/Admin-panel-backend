# This is a template of backend for blog using Nest, Prisma, PostgreSQL, ZOD, bcrypt and Docker

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Technologies Used

- Nest
- Prisma
- PostgreSQL
- ZOD
- bcrypt
- Docker


## Installation
1. Download from repository
```bash
$ git clone https://github.com/DmitryByrigin/Admin-panel-backend.git
```

2. Go to the root folder of the project
```bash
$ cd Admin-panel-backend
```

3. Install all dependencies
```bash
$ npm i
```

## .env

### An example of the content is in the .env file in the project

```bash
# Random jwttoken generation
$ node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

## Setting up the backend

```bash

# Generates Prisma client
$ prisma generate
or
$ npx prisma generate
This command triggers the Prisma client generation, creating a client library tailored to your data model. The generated client facilitates communication with the database and ensures type-safe database queries and mutations.

# Applies database migrations
$ prisma migrate
or
$ npx prisma migrate
Executing this command applies any pending database migrations, ensuring that your database schema aligns with the latest changes in your Prisma schema file. Migrations are essential for keeping the database structure up-to-date as your application evolves.


# Launches Prisma Studio
$ prisma studio
or
$ npx prisma studio
This command opens Prisma Studio, a graphical interface for interacting with your database. Prisma Studio allows you to explore and manipulate your data visually, making it a powerful tool for database management during development.


```

## Docker
```bash
# Command to builds, (re)creates, starts, and attaches to containers for a service.
$ docker-compose up
```

## Important information

### In the Contents.ts file, the lib folder, there should be a locale host on which the backend is running

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### It is desirable to enter all commands for startup and installation into the terminal.



## Server

```bash
http://localhost:3000/
```


## Possible errors

PS C:\Работа\Обучение новым технологиям\Admin-panel-backend> prisma generate
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Error: 
EPERM: operation not permitted, unlink 'C:\Работа\Обучение новым технологиям\Admin-panel-backend\node_modules\.prisma\client\query_engine-windows.dll.node'

### To fix
Close all unnecessary terminals


## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


## Stay in touch

- Authors - [Dmitry Burygin](https://github.com/DmitryByrigin?tab=overview&from=2023-12-01&to=2023-12-31),
[Ponomarov Artem](https://github.com/Aspergillusplay)


## License

Free license.
