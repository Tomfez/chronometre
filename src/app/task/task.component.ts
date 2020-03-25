import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {Task} from '../task';
import {Color} from '../color.enum';
import {ListService} from '../list.service';
import {TaskService} from '../task.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  public toDoForm: FormGroup;
  private db = firebase.firestore();

  // todo: Task[];
  // done: Done[];
  public hide = false;
  public colors = [];
  public tasksList = [];
  private lastId = 0;


  done = [
    { id: 1, task: 'Get up' },
    { id: 2, task: 'Brush teeth' },
    { id: 3, task: 'Take a shower' },
    { id: 4, task: 'Check e-mail' },
    { id: 5, task: 'Walk dog' }
  ];

  /**
   * constructor
   * @param formBuilder: FormBuilder
   * @param listService: ListService
   * @param taskService: TaskService
   */
  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
    private taskService: TaskService
  ) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.toDoForm = this.formBuilder.group({
      task: [null, Validators.required]
    });

    for (let i = 0; i < 42; i++) {
      this.colors.push(this.getRandomColor());
    }

    this.getTasks();

    // this.todo = [];
    // for (let i = 0; i < 42; i++) {
    //   this.todo.push(
    //     {id: i, task: Object.keys(Color)[i], done: false}
    //   );
    // }
  }

  private getTasks() {
    this.tasksList.push(this.taskService.getTasks());
  }

  /**
   * get task
   */
  get task() {
    return this.toDoForm.get('task') as FormControl;
  }

  /**
   * Ajoute une tâche
   * @param form: formulaire
   */
  public onSubmit(form) {
    // let lastId = 0;
    console.warn('Tache: ', form);

    if (this.toDoForm.invalid) {
      return;
    }

    this.createTask(form.task);
  }

  /**
   * Supprime une tâche
   * @param id: id de la tâche
   */
  deleteTask(id: number) {
    // todo : supprimer une tâche d'une des 2 listes
    // console.warn('liste avant', this.todo);
    //   this.todo = this.todo.filter(t => t.id !== id);
    // console.warn('liste apres', this.todo);
  }

  /**
   * Transfère une tâche d'une liste à l'autre
   * @param event: Event drop
   */
  drop(event: CdkDragDrop<Task[]>) {
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
   * Génère une couleur aléatoire
   */
  private getRandomColor() {
    const item = this.getRandomInt(0, Object.keys(Color).length);
    const color = Object.keys(Color)[item];

    return Color[color];
  }

  /**
   * Retourne un nombre aléatoire
   * @param min: nombre min
   * @param max: nombre max
   */
  private getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Permet de switch entre l'affichage et l'édition d'une tâche
   */
  public toggleInput() {
    this.hide = !this.hide;
  }

  /**
   * Création d'une tâche
   * @param val: tâche
   */
  private createTask(val: string) {
    const newTask = new Task({
      id: ++this.lastId,
      task: val
    });

    console.log(newTask);

    // Dans un premier temps on récupère la liste correspondante, puis on ajoute une nouvelle tâche
    this.taskService.createTask(newTask);
  }

}
