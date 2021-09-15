import Connection from "../../data/models/Connection";
import ConnectionsStore from "../../data/stores/ConnectionsStore";
import { BaseApiController } from "./BaseApiController";

export default class ConnectionsApiController extends BaseApiController<
  Connection,
  ConnectionsStore
> {
  constructor() {
    super();
  }

  getStore(): ConnectionsStore {
    return new ConnectionsStore();
  }
}
