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
    action: "one",
  },
  {
    method: "post",
    route: "/notes",
    controller: NoteController,
    action: "createNote",
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
];
