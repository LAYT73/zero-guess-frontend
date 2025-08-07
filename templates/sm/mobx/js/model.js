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
}

export const exampleModel = new ExampleModel();
