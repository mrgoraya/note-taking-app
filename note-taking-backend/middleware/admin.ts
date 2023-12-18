/// <reference path="../types/custom.d.ts" />

import { NextFunction, Request, Response } from "express";

export function admin(req: Request, res: Response, next: NextFunction) {
  if (!req.user.isAdmin) return res.status(403).send("Access Denied.");

  next();
}
