interface IConnection {
  type: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export default class Connection implements IConnection {
  type: string;
  name: string;
  host: string;
  port: number;
  username?: string;
  password?: string;

  constructor(type: string, name: string, host: string, port: number);
  constructor(
    type: string,
    name: string,
    host: string,
    port: number,
    username?: string,
    password?: string
  );
  constructor(
    type: string,
    name: string,
    host: string,
    port: number,
    username?: string,
    password?: string
  ) {
    this.type = type;
    this.name = name;
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
  }
}
