/// <reference path="../types/custom.d.ts" />

import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  const { ACCESS_TOKEN_SECRET } = process.env;

  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = verify(token, ACCESS_TOKEN_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token.");
  }
}
