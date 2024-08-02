import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent {
  @Output() remove: EventEmitter<Task> = new EventEmitter<Task>();

  taskService: TaskService = inject(TaskService);
  tasksTodoList: Task[];
  tasksDoneList: Task[];
  disabled: boolean = false;
  colors: string[] = [];

  constructor() {
    this.tasksTodoList = this.taskService
      .getAllTasks()
      .filter(task => !task.isDone);
    // this.disabled = false;
    console.log(this.tasksTodoList);
    // this.tasksTodoList.forEach(task => {
    //   const color = this.taskService.getRandomColor();
    //   this.colors.push(color);
    // });

    this.tasksDoneList = this.taskService
      .getAllTasks()
      .filter(task => task.isDone);
    // // for (let i = 0; i < this.tasksTodoList.length; i++) {
    // //   const color = this.taskService.getRandomColor();
    // //   this.colors.push(color);
    // // }
  }

  addTask(task: string): void {
    const tt: Task = {
      id: 5,
      description: task,
      disabled: false,
      isDone: false
    };
    this.taskService.addItem(tt);
  }

  removeTask(task: Task): void {
    this.remove.emit(task);
    this.taskService.deleteItem(task);
  }

  /**
   * Transfère une tâche d'une liste à l'autre
   * @param event: Event drop
   */
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const task = event.container.data[event.currentIndex];
      console.log(task);
      task.isDone = !task.isDone;
      // this.updateTask(task);
    }
  }

  toggleInput() {
    this.disabled = !this.disabled;
  }
}
