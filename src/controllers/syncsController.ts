import { NextFunction, Request, Response } from "express";
import { OperationsStore } from "../data/stores";

export function getSyncsView(req: Request, res: Response, next: NextFunction) {
  const store = new OperationsStore();
  const syncs = store.getAll().filter((o) => o.type == "sync");
  res.render("syncs/syncs", { syncs });
}

export function getNetConnectionView(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.render("syncs/syncs");
}
