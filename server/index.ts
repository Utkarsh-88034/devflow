import express, { Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./Routes/auth.routes";
import { graphqlHTTP } from "express-graphql";
import schema from "./Schema/schema";

import cors from "cors";
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/test";

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
//db

mongoose.connect(databaseURL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log(`Database Connected successfully`);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
