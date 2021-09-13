import { NextFunction, Request, Response } from "express";
import Connection from "../data/Connection";
import ConnectionsFile from "../data/connectionsFile";
import { ConnectionExistsError } from "../data/Errors";

export function getConnection(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.params;
    const connectionsFile = new ConnectionsFile();
    const connection = connectionsFile.getConnection(name);
    res.json(connection);
  } catch (err) {
    next(err);
  }
}

export function addConnection(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, host, port, username, password } = req.body;
    const connection = new Connection(name, host, port, username, password);
    const connectionsFile = new ConnectionsFile();
    connectionsFile.addConnection(connection);
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
    const connectionsFile = new ConnectionsFile();
    const connections = connectionsFile.getAllConnections();
    res.json(connections);
  } catch (err) {
    next(err);
  }
}
