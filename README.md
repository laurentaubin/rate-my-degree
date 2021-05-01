<div align="center">
<img src="https://raw.githubusercontent.com/laurentaubin/rate-my-glo/master/assets/logo_full_rocket.svg"/></div>

## Description

Web application allowing users to see information on pre-determined courses and comment on them.

This application is aimed at Université Laval software engineering students and professors, but could be tweaked to be used by another program/university.

## MVP Features

✅ Create a course

✅ Display each course on a seperate page with all its information

✅ Allow users to comment on a course

✅ Allow users to reply to comments

✅ Allow users to search for a course using its initials, title or professor

⏳ Allow users to authenticate (hopefully with Ulaval sign in, otherwhise probably Google)

❌ Have a fully responsive UI

❌ Implement api authorization (mostly for creating courses)

## Stack

### Front End

The front end will be a web application developped using [React.js](https://reactjs.org/) in pair with [TypeScript](https://www.typescriptlang.org/).

### Back End

The back end will consist of a [GraphQL](https://graphql.org/) API hosted using [Apollo](https://www.apollographql.com/) and is built with [Node.js](https://nodejs.org/en/) paired with TypeScript.

### Database

The data will be stored on a [PostgreSQL](https://www.postgresql.org/) database and the project is using [TypeORM](https://typeorm.io/) as a relational model.

## Local development

### Run the app

#### Set up Postgres database

First, [install postgresql database](https://www.postgresql.org/download/). You can also use package managers like apt and homebrew. Check your package manager's documentation for more information.
Then create the project's database

```bash
$ sudo -iu postgres psql
$ CREATE DATABASE ratemyglo;
```

#### Run the node server

Move to backend directory

```bash
$ cd backend
```

Install all dependencies

```bash
$ yarn install
```

Compile the app using typescript

```bash
yarn build
```

Run the app using nodemon

```bash
yarn dev
```

Additionally, you can run the `yarn watch` command in a seperate terminal to listen for file changes and auto-compile the app while developping.

#### Run application frontend

Move to frontend directory

```bash
$ cd frontend
```

Install all dependencies

```bash
$ yarn install
```

Run the app

```bash
yarn dev
```

#### Access the app

The GraphQL server is served at http://localhost:4000/graphql
The React frontend is served at http://localhost:3000
