import { NextFunction, Request, Response } from "express";
import { OperationsStore, ConnectionsStore } from "../data/stores";

export function getImportsView(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const store = new OperationsStore();
  const imports = store.getAll().filter((o) => o.type == "import");
  const connectionsStore = new ConnectionsStore();
  imports.forEach((i) => {
    i["origin"] = connectionsStore.get(i.originId) || { name: "unknown" };
    i["target"] = connectionsStore.get(i.targetId) || { name: "unknown" };
  });
  res.render("imports/imports", { imports });
}

export function getNewImportView(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const connectionsStore = new ConnectionsStore();
  const origins = connectionsStore.getAll().filter((c) => c.type == "postgres");
  const targets = connectionsStore.getAll().filter((c) => c.type == "es");
  res.render("imports/new-import", { origins, targets });
}
