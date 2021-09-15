import { readFileSync, writeFileSync } from "fs";
import { DuplicateRecordError } from "../Errors";
import BaseDataStoreModel from "../models/BaseDataStoreModel";

interface IDataStore<T extends BaseDataStoreModel> {
  createInstance(): T;
  getAll(): T[];
  get(id: string): T;
  add(instance: T): void;
}

export default abstract class BaseDataStore<T extends BaseDataStoreModel>
  implements IDataStore<T>
{
  store: object;
  dataFilePath: string;

  abstract createInstance();

  getAll() {
    const res = Object.keys(this.store).map((name) =>
      Object.assign(this.createInstance(), this.store[name])
    );
    return res;
  }

  get(id: string): T {
    const connection = this.store[id];
    if (!connection) {
      return null;
    }
    return Object.assign(this.createInstance(), this.store[id]);
  }

  add(instance: T) {
    const { id } = instance;
    if (this.store.hasOwnProperty(id)) {
      throw new DuplicateRecordError();
    }
    this.store[id] = instance;
    this.dump();
  }

  constructor(dataFilePath: string) {
    this.dataFilePath = dataFilePath;
    this.store = JSON.parse(readFileSync(dataFilePath).toString());
  }

  dump() {
    writeFileSync(this.dataFilePath, JSON.stringify(this.store));
  }
}
