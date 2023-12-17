import { RequestHandler } from "express";

export type HttpMethod = "get" | "post" | "patch" | "delete";

export interface Route {
  method: HttpMethod;
  route: string;
  controller: new (...agrs: any[]) => any;
  action: string;
  middleware?: RequestHandler[];
}
