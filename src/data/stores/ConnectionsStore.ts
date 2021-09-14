import config from "../../config";
import { Connection } from "../models";
import { ConnectionExistsError } from "../Errors";
import BaseDataStore from "./BaseDataStore";

export default class ConnectionsStore extends BaseDataStore<Connection> {
  constructor() {
    const path = config.connectionsFilePath;
    super(path);
  }

  store: object;
  dataFilePath: string;

  getAll(): Connection[] {
    const res = Object.keys(this.store).map((name) => {
      const { host, port, username, password } = this.store[name];
      return new Connection("", name, host, port, username, password);
    });
    return res;
  }

  get(name: string): Connection {
    const connection = this.store[name.toLowerCase()];
    if (!connection) {
      return null;
    }
    const { host, port, username, password } = connection;
    const result = new Connection(host, port, username, password);
    return result;
  }

  add(connection: Connection) {
    const { name, host, port, username, password } = connection;
    if (this.store.hasOwnProperty(name.toLowerCase())) {
      throw new ConnectionExistsError();
    }
    this.store[name.toLocaleLowerCase()] = {
      host,
      port,
      username,
      password,
    };
    this.dump();
  }
}
