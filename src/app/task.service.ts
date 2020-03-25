import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Task} from './task';
import {ListService} from './list.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private db = firebase.firestore();
  public tasks = [];

  constructor(
    private listService: ListService
  ) { }

  /**
   * Retourne les tâches de la liste courante
   */
  getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * Récupère les tâches liées à une liste
   * @param currentList: liste
   */
  getTasksByList(currentList) {
    this.db.collection('tasks')
      .where('list', '==', currentList)
      .onSnapshot(docSnapshot => {
        this.tasks = [];

        docSnapshot.forEach((doc) => {
          this.tasks.push(doc.data());
          console.log('Current data: ', doc.data());
        });
      }, err => {
        console.log(`Encountered error: ${err}`);
      });
  }

  /**
   * Ajout d'une tâche dans la liste en cours
   * @param task: tâche
   */
  createTask(task: Task) {
    this.db.collection('lists').where('name', '==', this.listService.getCurrentList())
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

          // Ajout d'une tâche dans la collection "tasks"
          firebase.firestore().collection('lists').doc(doc.id).collection('tasks').add({
            id: task.id,
            name: task.task,
            done: task.done
          });
        });
      })
      .catch((err) => {
        console.log('Error adding task', err);
      });
  }
}
