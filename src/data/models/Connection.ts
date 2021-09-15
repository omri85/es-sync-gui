import BaseDataStoreModel from "./BaseDataStoreModel";
import IDataStoreModel from "./BaseDataStoreModel";

interface IConnection extends IDataStoreModel {
  type: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export default class Connection
  extends BaseDataStoreModel
  implements IConnection
{
  id: string;
  type: string;
  name: string;
  host: string;
  port: number;
  username?: string;
  password?: string;

  constructor();
  constructor(
    type?: string,
    name?: string,
    host?: string,
    port?: number,
    username?: string,
    password?: string
  );
  constructor(
    type?: string,
    name?: string,
    host?: string,
    port?: number,
    username?: string,
    password?: string
  ) {
    super();
    this.type = type;
    this.name = name;
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
  }
}
