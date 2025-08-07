import { makeAutoObservable } from "mobx";

class ExampleModel {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  setCount(value: number) {
    this.count = value;
  }
}

export const exampleModel = new ExampleModel();
export type ExampleModelType = typeof exampleModel;
