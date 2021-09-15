import { v4 as uuidv4 } from "uuid";

interface IDataStoreModel {
  id: string;
}

export default abstract class BaseDataStoreModel implements IDataStoreModel {
  id: string;
  constructor() {
    this.id = uuidv4();
  }
}
