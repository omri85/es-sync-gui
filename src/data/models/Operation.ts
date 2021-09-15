import BaseDataStoreModel from "./BaseDataStoreModel";

interface IOperation {
  originId: string;
  targetId: string;
  type: "import" | "sync";
  start: Date;
  end: Date;
  complete(): void;
}

export default class Operation
  extends BaseDataStoreModel
  implements IOperation
{
  /**
   * Origin connection name
   */
  originId: string;
  /**
   * Target connection name
   */
  targetId: string;
  type: "import" | "sync";
  start: Date;
  end: Date;

  constructor();
  constructor(type?: "import" | "sync", originId?: string, targetId?: string) {
    super();
    this.type = type;
    this.originId = originId;
    this.targetId = targetId;
    this.start = new Date();
    this.end = null;
  }

  complete() {
    this.end = new Date();
  }
}
