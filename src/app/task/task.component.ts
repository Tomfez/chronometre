import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {Task} from '../task';
import {ListService} from '../list.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as firebase from 'firebase';
import randomColor from 'randomcolor';

import DocumentData = firebase.firestore.DocumentData;
import FieldValue = firebase.firestore.FieldValue;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  public toDoForm: FormGroup;
  public hide = false;
  public colors: string[] = [];
  private db = firebase.firestore();
  public tasksList: DocumentData[] = [];
  public tasksDoneList: DocumentData = [];

  oList = () => this.db.collection('lists').where('name', '==', this.listService.getCurrentListName()).get();

  /**
   * constructor
   * @param formBuilder: FormBuilder
   * @param listService: ListService
   */
  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
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
      const color = randomColor(); // a hex code for an attractive color

      this.colors.push(color);
      // this.tasksList.push({name: color});
    }

    this.getTasks();
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
    console.warn('Tache: ', form);

    if (this.toDoForm.invalid) {
      return;
    }

    this.createTask(form.task);
    this.formDirective.resetForm();
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

      const task = event.container.data[event.currentIndex];

      // Passage de la tâche en "done" ou non
      task.done = !task.done;
      this.updateTask(task);
    }
  }

  // clearDoneList() {
  //   this.done = [];
  //   return this.done;
  // }

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
      task: val
    });

    this.oList().then(querySnapshot => {
      if (!querySnapshot.empty) {
        // Ajout d'une tâche dans la collection "tasks"
        this.db.collection('lists')
          .doc(querySnapshot.docs[0].id)
          .collection('tasks')
          .add({
            name: newTask.task,
            done: newTask.done,
            timestamp: FieldValue.serverTimestamp(),
            list: querySnapshot.docs[0].data().name
          });
      }
      // });
    }).catch((err) => {
      console.log('Error adding task', err);
    });
  }

  /**
   * Récupère la liste des tâches pour la liste courante
   */
  private getTasks() {
    const currentList = this.listService.getCurrentListName();

    firebase.firestore().collectionGroup('tasks').where('list', '==', currentList)
      .onSnapshot(querySnapshot => {
        this.tasksList = [];
        this.tasksDoneList = [];

        querySnapshot.forEach(doc => {
          if (doc.data().done) {
            this.tasksDoneList.push(doc.data());
          } else {
            this.tasksList.push(doc.data());
          }
        });
      });
  }

  /**
   * Update une tâche
   * @param data: tâche
   */
  updateTask(data) {
    this.db.collectionGroup('tasks').where('timestamp', '==', data.timestamp).get().then(querySnapshot => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            name: data.name,
            done: data.done,
            timestamp: FieldValue.serverTimestamp()
          });
        });
      }
    });
  }

  /**
   * Supprime une tâche
   * @param taskName: tâche
   */
  deleteTask(taskName: string) {
    // todo : supprimer une tâche d'une des 2 listes

    this.db.collectionGroup('tasks').where('name', '==', taskName).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  }

}
