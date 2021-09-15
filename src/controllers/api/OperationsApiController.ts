import { Operation } from "../../data/models";
import { OperationsStore } from "../../data/stores";
import { BaseApiController } from "./BaseApiController";

export default class OperationsApiController extends BaseApiController<
  Operation,
  OperationsStore
> {
  constructor() {
    super();
  }

  getStore(): OperationsStore {
    return new OperationsStore();
  }
}
