import { readFileSync, writeFileSync } from "fs";

interface IDataStore<T> {
  getAll(): T[];
  get(name: string): T;
  add(connection: T): void;
}

export default abstract class BaseDataStore<T> implements IDataStore<T> {
  store: object;
  dataFilePath: string;

  abstract getAll(): T[];
  abstract get(name: string): T;
  abstract add(connection: T): void;

  constructor(dataFilePath: string) {
    this.dataFilePath = dataFilePath;
    this.store = JSON.parse(readFileSync(dataFilePath).toString());
  }

  dump() {
    writeFileSync(this.dataFilePath, JSON.stringify(this.store));
  }
}
