import { readFileSync, writeFileSync } from "fs";
import config from "../config";
import Connection from "./Connection";
import { ConnectionExistsError } from "./Errors";

interface IConnectionsFile {
  getAllConnections(): Connection[];
  getConnection(name: string): Connection;
  addConnection(connection: Connection): void;
}

export default class ConnectionsFile implements IConnectionsFile {
  connections: object;
  connectionsFilePath: string;

  constructor();
  constructor(connectionFilePath?: string) {
    this.connectionsFilePath = connectionFilePath || config.connectionsFilePath;
    try {
      const f = readFileSync(this.connectionsFilePath).toString();
      this.connections = JSON.parse(f);
    } catch (err) {
      this.connections = {};
    }
  }

  dump() {
    writeFileSync(this.connectionsFilePath, JSON.stringify(this.connections));
  }

  getAllConnections(): Connection[] {
    const res = Object.keys(this.connections).map((name) => {
      const { host, port, username, password } = this.connections[name];
      return new Connection("", name, host, port, username, password);
    });
    return res;
  }

  getConnection(name: string): Connection {
    const connection = this.connections[name.toLowerCase()];
    if (!connection) {
      return null;
    }
    const { host, port, username, password } = connection;
    const result = new Connection(host, port, username, password);
    return result;
  }

  addConnection(connection: Connection) {
    const { name, host, port, username, password } = connection;
    if (this.connections.hasOwnProperty(name.toLowerCase())) {
      throw new ConnectionExistsError();
    }
    this.connections[name.toLocaleLowerCase()] = {
      host,
      port,
      username,
      password,
    };
    this.dump();
  }
}
