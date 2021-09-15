import config from "../../config";
import { Connection } from "../models";
import BaseDataStore from "./BaseDataStore";

export default class ConnectionsStore extends BaseDataStore<Connection> {
  createInstance() {
    return new Connection();
  }

  constructor() {
    const path = config.connectionsFilePath;
    super(path);
  }
}
