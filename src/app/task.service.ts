import { inject, Injectable } from '@angular/core';
import { Task } from './task';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private dbPath = '/tasks';
  // tasksList: AngularFireList<Task[]>;
  // item$: Observable<any[]>;
  // firestore: Firestore = inject(Firestore);
  // constructor(private db: AngularFireDatabase) {
  //   this.tasksList = db.list(this.dbPath);
  // }

  constructor() {
    // const aCollection = collection(this.firestore, '');
    // this.item$ = collectionData(aCollection);
    // this.item$ = this.getAllTasks();
  }

  tasks: Task[] = [
    { id: 1, description: "task 1", isDone: false, disabled: false },
    { id: 2, description: "task 2", isDone: false, disabled: false },
    { id: 3, description: "task 3", isDone: false, disabled: false },
    { id: 4, description: "task 4", isDone: true, disabled: true }
  ];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  getAllTasks() {
    // return this.item$;
    return this.tasks;
  }


  getRandomColor(): string {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
