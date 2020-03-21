import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Todo } from '../todo';
import { Done } from '../done';
import { Color } from '../color.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent  {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  toDoForm: FormGroup;
  todo: Todo[];
  // done: Done[];
  hide = false;
  colors = [];

  done = [
    { id: 1, task: 'Get up' },
    { id: 2, task: 'Brush teeth' },
    { id: 3, task: 'Take a shower' },
    { id: 4, task: 'Check e-mail' },
    { id: 5, task: 'Walk dog' }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.toDoForm = this.formBuilder.group({
      task: [null, Validators.required]
    });

    for (let i = 0; i < 42; i++) {
      this.colors.push(this.getRandomColor());
    }

    this.todo = [];
    for (let i = 0; i < 42; i++) {
      this.todo.push(
        {id: i, task: Object.keys(Color)[i]}
      );
    }
  }

  get task() {
    return this.toDoForm.get('task') as FormControl;
  }

  /**
   * Ajoute une tâche
   * @param form: formulaire
   */
  onSubmit(form) {
    let lastId = 0;
    console.warn('Tache: ', form);

    if (this.toDoForm.invalid) {
      return;
    }

    if (this.todo.length > 0) {
      lastId = this.todo[this.todo.length - 1].id;
    }

    const task = {id: lastId + 1, task: form.task};
    this.addTodoTask(task as Todo);
    this.formDirective.resetForm();
  }

  /**
   * Supprime une tâche
   * @param id: id de la tâche
   */
  deleteTask(id: number) {
    // todo : supprimer une tâche d'une des 2 listes
    // console.warn('liste avant', this.todo);
    this.todo = this.todo.filter(t => t.id !== id);
    // console.warn('liste apres', this.todo);
  }

  /**
   * Transfère une tâche d'une liste à l'autre
   * @param event: Event drop
   */
  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // clearDoneList() {
  //   this.done = [];
  //   return this.done;
  // }

  /**
   * Ajoute une tâche à la liste en cours
   * @param item: tâche
   */
  addTodoTask(item: Todo) {
    this.todo.push({id: item.id, task: item.task});
  }

  /**
   * Génère une couleur aléatoire
   */
  getRandomColor() {
    const item = this.getRandomInt(0, Object.keys(Color).length);
    const color = Object.keys(Color)[item];

    return Color[color];
  }

  /**
   * Retourne un nombre aléatoire
   * @param min: nombre min
   * @param max: nombre max
   */
  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Permet de switch entre l'affichage et l'édition d'une tâche
   */
  toggleInput() {
    this.hide = !this.hide;
  }
}
