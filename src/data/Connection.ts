interface IConnection {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export default class Connection implements IConnection {
  name: string;
  host: string;
  port: number;
  username?: string;
  password?: string;

  constructor(name: string, host: string, port: number);
  constructor(
    name: string,
    host: string,
    port: number,
    username?: string,
    password?: string
  );
  constructor(
    name: string,
    host: string,
    port: number,
    username?: string,
    password?: string
  );
  constructor(
    name: string,
    host: string,
    port: number,
    username?: string,
    password?: string
  ) {
    this.name = name;
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
  }
}
