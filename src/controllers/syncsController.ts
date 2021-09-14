import { NextFunction, Request, Response } from "express";
import ConnectionsStore from "../data/stores/ConnectionsStore";

export function getSyncsView(req: Request, res: Response, next: NextFunction) {
  // const connectionsFile = new ConnectionsStore();
  // const connections = connectionsFile.getAllConnections();
  // res.render("connections/connections", {
  //   connections,
  // });
}

export function getNetConnectionView(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.render("connections/new-connection");
}
