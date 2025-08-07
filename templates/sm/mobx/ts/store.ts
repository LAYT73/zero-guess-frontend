import { makeAutoObservable } from "mobx";
import { exampleModel } from "./model";

class RootStore {
  example = exampleModel;

  constructor() {
    makeAutoObservable(this);
  }
}

export const rootStore = new RootStore();
export type RootStoreType = typeof rootStore;
