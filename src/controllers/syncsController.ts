import { NextFunction, Request, Response } from "express";
import { OperationsStore, ConnectionsStore } from "../data/stores";

export function getSyncsView(req: Request, res: Response, next: NextFunction) {
  const store = new OperationsStore();
  const syncs = store.getAll().filter((o) => o.type == "sync");
  const connectionsStore = new ConnectionsStore();
  syncs.forEach((sync) => {
    sync["origin"] = connectionsStore.get(sync.originId) || { name: "unknown" };
    sync["target"] = connectionsStore.get(sync.targetId) || { name: "unknown" };
  });
  res.render("syncs/syncs", { syncs });
}

export function getNetConnectionView(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.render("syncs/syncs");
}
