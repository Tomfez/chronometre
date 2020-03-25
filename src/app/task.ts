export class Task {
  id: number;
  task: string;
  done: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
