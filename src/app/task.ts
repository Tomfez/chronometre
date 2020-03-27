export class Task {
  task: string;
  done: boolean = false;
  list: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
