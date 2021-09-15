import { NextFunction, Request, Response } from "express";
import { DuplicateRecordError } from "../../data/Errors";
import BaseDataStoreModel from "../../data/models/BaseDataStoreModel";
import BaseDataStore from "../../data/stores/BaseDataStore";

interface IApiController<
  TModel extends BaseDataStoreModel,
  TStore extends BaseDataStore<TModel>
> {
  getStore(): TStore;
  get(req: Request, res: Response, next: NextFunction);
  getAll(req: Request, res: Response, next: NextFunction);
  create(req: Request, res: Response, next: NextFunction);
}

export abstract class BaseApiController<
  TModel extends BaseDataStoreModel,
  TStore extends BaseDataStore<TModel>
> implements IApiController<TModel, TStore>
{
  abstract getStore(): TStore;
  get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const store = this.getStore();
      const instance = store.get(id);
      res.json(instance);
    } catch (err) {
      next(err);
    }
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const store = this.getStore();
      const instances = store.getAll();
      res.json(instances);
    } catch (err) {
      next(err);
    }
  }

  create(req: Request, res: Response, next: NextFunction) {
    try {
      const store = this.getStore();
      const connection = Object.assign(store.createInstance(), req.body);
      store.add(connection);
      res.redirect("/connections");
      // res.sendStatus(204);
    } catch (err) {
      if (err instanceof DuplicateRecordError) {
        res.status(400).send("Connection already exists");
      }
      next(err);
    }
  }
}
