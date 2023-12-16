import { NoteController } from "./controller/NoteController";

type HttpMethod = "get" | "post" | "patch" | "delete";

interface Route {
  method: HttpMethod;
  route: string;
  controller: new (...agrs: any[]) => any;
  action: string;
}

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
];
