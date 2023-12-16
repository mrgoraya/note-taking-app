import "reflect-metadata";
import { DataSource } from "typeorm";

import { Note } from "./entity/Note";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "note",
  password: "123",
  database: "notedb",
  synchronize: true,
  logging: true,
  entities: [Note],
  subscribers: [],
  migrations: [],
});
