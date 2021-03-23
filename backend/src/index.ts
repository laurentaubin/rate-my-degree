import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Course } from "./entities/Course";
import { CourseComment } from "./entities/CourseComment";
import { CourseResolver } from "./resolvers/CourseResolver";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "ratemyglo",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [Course, CourseComment],
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
      resolvers: [CourseResolver],
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
