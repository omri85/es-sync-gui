import Connection from "./Connection";

export default class Sync {
  origin: Connection;
  target: Connection;
  start: Date;
  done: boolean;

  constructor(origin: Connection, target: Connection) {
    this.origin = origin;
    this.target = target;
    this.start = new Date();
    this.done = false;
  }

  complete() {
    this.done = true;
  }
}
