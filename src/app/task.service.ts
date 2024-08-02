import { inject, Injectable } from '@angular/core';
import { Task } from './task';
import { StorageService } from './services/storage.service';

const todoListStorageKey = 'Todo_List';
const defaulttasksList: Task[] = [
  { id: 1, description: "task 1", isDone: false, disabled: false },
  { id: 2, description: "task 2", isDone: false, disabled: false },
  { id: 3, description: "task 3", isDone: false, disabled: false },
  { id: 4, description: "task 4", isDone: true, disabled: true }
];

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasksList: Task[];

  constructor(private storageService: StorageService) {
    const res = this.storageService.getData(todoListStorageKey);
    this.tasksList =  res.length != undefined ? res : defaulttasksList;
  }

  addItem(val: Task): void {
    this.tasksList.push(val);
    this.saveList();
  }

  updateItem(item: Task, changes: any): void {
    const index = this.tasksList.indexOf(item);
    this.tasksList[index] = { ...item, ...changes };
    this.saveList();
  }

  deleteItem(item: Task) {
    const index = this.tasksList.indexOf(item);
    this.tasksList.splice(index, 1);
    this.saveList();
  }

  saveList() {
    this.storageService.setData(todoListStorageKey, this.tasksList);
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  getAllTasks() {
    // return this.item$;
    return this.tasksList;
  }


  getRandomColor(): string {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
