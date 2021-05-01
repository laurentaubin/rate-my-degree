import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { CommentResolver } from "./resolvers/CommentResolver";
import { CourseResolver } from "./resolvers/CourseResolver";

const main = async () => {
  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "ratemyglo",
    entities: ["dist/entities/*.js"],
    migrations: ["dist/migrations/*.js"],
    logging: true,
    synchronize: true,
  });

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CourseResolver, CommentResolver],
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000),
    () => {
      console.log("server started on localhost:4000");
    };
};

main().catch((err) => {
  console.error(err);
});
