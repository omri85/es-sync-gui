import { Sync } from "../models";
import BaseDataStore from "./BaseDataStore";

export default class SyncsStore extends BaseDataStore<Sync> {
  getAll(): Sync[] {
    throw new Error("Method not implemented.");
  }
  get(name: string): Sync {
    throw new Error("Method not implemented.");
  }
  add(connection: Sync): void {
    throw new Error("Method not implemented.");
  }
}
