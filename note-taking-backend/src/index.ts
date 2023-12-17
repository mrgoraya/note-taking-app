import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { config } from "dotenv";

import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { swaggerSpec } from "./utils/swagger";

config();
const { PORT } = process.env;

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      const handler = (req: Request, res: Response, next: Function) => {
        const result = new route.controller()[route.action](req, res, next);
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined ? result : undefined
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      };

      const middlewares = route.middleware ? route.middleware : [];
      app[route.method](route.route, ...middlewares, handler);
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.listen(PORT);

    console.log(`Server started at port: ${PORT}`);
  })
  .catch((error) => console.log(error));
