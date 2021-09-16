import { NextFunction, Request, Response } from "express";
import { DuplicateRecordError } from "../../data/Errors";
import BaseDataStoreModel from "../../data/models/BaseDataStoreModel";
import BaseDataStore from "../../data/stores/BaseDataStore";

interface IApiController<
  TModel extends BaseDataStoreModel,
  TStore extends BaseDataStore<TModel>
> {
  homeView: string;
  getStore(): TStore;
  get(req: Request, res: Response, next: NextFunction): void;
  getAll(req: Request, res: Response, next: NextFunction): void;
  create(req: Request, res: Response, next: NextFunction): void;
  delete(req: Request, res: Response, next: NextFunction): void;
}

export abstract class BaseApiController<
  TModel extends BaseDataStoreModel,
  TStore extends BaseDataStore<TModel>
> implements IApiController<TModel, TStore>
{
  abstract homeView: string;
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
      const instances = Object.assign(store.createInstance(), req.body);
      store.add(instances);
      res.redirect(this.homeView);
    } catch (err) {
      if (err instanceof DuplicateRecordError) {
        res.status(400).send("Connection already exists");
      }
      next(err);
    }
  }

  delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const store = this.getStore();
      store.remove(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
