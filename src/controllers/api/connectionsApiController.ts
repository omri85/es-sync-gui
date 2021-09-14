import { NextFunction, Request, Response } from "express";
import Connection from "../../data/models/Connection";
import ConnectionsStore from "../../data/stores/ConnectionsStore";
import { ConnectionExistsError } from "../../data/Errors";

export function getConnection(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.params;
    const connectionsFile = new ConnectionsStore();
    const connection = connectionsFile.get(name);
    res.json(connection);
  } catch (err) {
    next(err);
  }
}

export function addConnection(req: Request, res: Response, next: NextFunction) {
  try {
    const { type, name, host, port, username, password } = req.body;
    const connection = new Connection(
      type,
      name,
      host,
      port,
      username,
      password
    );
    const connectionsFile = new ConnectionsStore();
    connectionsFile.add(connection);
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ConnectionExistsError) {
      res.status(400).send("Connection already exists");
    }
    next(err);
  }
}

export function getAllConnections(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const connectionsFile = new ConnectionsStore();
    const connections = connectionsFile.getAll();
    res.json(connections);
  } catch (err) {
    next(err);
  }
}
