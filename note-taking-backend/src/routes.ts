import { auth } from "../middleware/auth";
import { AuthController } from "./controller/AuthController";
import { NoteController } from "./controller/NoteController";
import { UserController } from "./controller/UserController";
import { Route } from "./utils/types";

export const Routes: Route[] = [
  {
    method: "get",
    route: "/notes",
    controller: NoteController,
    action: "findAll",
  },
  {
    method: "get",
    route: "/notes/:id",
    controller: NoteController,
    action: "getById",
  },
  {
    method: "post",
    route: "/notes",
    controller: NoteController,
    action: "createNote",
    middleware: [auth],
  },
  {
    method: "delete",
    route: "/notes/:id",
    controller: NoteController,
    action: "deleteNote",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "createUser",
  },
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "findAll",
  },
  {
    method: "post",
    route: "/auth",
    controller: AuthController,
    action: "authenticateUser",
  },
];
