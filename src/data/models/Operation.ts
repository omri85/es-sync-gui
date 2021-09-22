import { Connection } from ".";
import { ConnectionsStore } from "../stores";
import BaseDataStoreModel from "./BaseDataStoreModel";
import OperationStatus from "./OperationStatus";

class Operation extends BaseDataStoreModel {
  id: string;
  type: "import" | "sync";
  start?: Date;
  end?: Date;
  originConnection: Connection;
  targetConnection: Connection;
  originDatabase: string;
  targetIndex: string;
  originTable: string;
  pid?: number;
  status: OperationStatus;

  constructor(options?) {
    super();
    if (options) {
      const store = new ConnectionsStore();
      this.originConnection = store.get(options.originConnectionId);
      this.targetConnection = store.get(options.targetConnectionId);
      this.type = options.type;
      this.originTable = options.originTable;
      this.originDatabase = options.originDatabase;
      this.targetIndex = options.targetIndex;
      this.status = OperationStatus.Ready;
    }
  }
}

export default Operation;
