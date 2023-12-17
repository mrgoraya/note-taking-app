import "reflect-metadata";
import { DataSource } from "typeorm";

import { Note } from "./entity/Note";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "note",
  password: "123",
  database: "notedb",
  synchronize: true,
  logging: true,
  entities: [Note, User],
  subscribers: [],
  migrations: [],
});
