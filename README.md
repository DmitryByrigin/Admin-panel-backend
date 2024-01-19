<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest




## Installation
1. Install project
```bash
$ git clone https://github.com/DmitryByrigin/Admin-panel-backend.git
```

2.
```bash
$ cd Admin-panel-backend
```

3. 
```bash
$ npm i
```

## Setting up the backend

```bash

# prisma generation
$ prisma generate

# installation Prisma CLI
$ npm install @prisma/cli

# Starts Prisma Studio
$ prisma studio

```

## .env

```bash
# Random jwttoken generation
$ node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

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

## Support

Support our work if you want)

## Stay in touch

- Authors - [Dmitry Burygin](https://github.com/DmitryByrigin?tab=overview&from=2023-12-01&to=2023-12-31),
[Ponomarov Artem](https://github.com/Aspergillusplay)


## License

Free license.
