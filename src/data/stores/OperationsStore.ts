import { Operation } from "../models";
import BaseDataStore from "./BaseDataStore";
import config from "../../config";

export default class OperationsStore extends BaseDataStore<Operation> {
  constructor() {
    super(config.syncsFilePath);
  }
  createInstance() {
    return new Operation();
  }
}
