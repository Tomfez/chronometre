import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  private currentList: string;
  private lists = [];
  private list = [];
  private db = firebase.firestore();

  constructor() { }

  getCurrentList(): string {
    return this.currentList;
  }

  setCurrentList(list: string) {
    this.currentList = list;
  }

  createList(list) {
    this.db.collection('lists').add({
      name: list.list
    }).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
  }

  getAllLists() {
    this.lists = [];

    this.db.collection('lists').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.lists.push(doc.data());
          // console.log(doc.id, '=>', doc.data().list);
        });

        // Liste par défaut (1ère)
        this.setCurrentList(snapshot.docs[0].data().name);

      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

    return this.lists;
  }

  getList(name) {
    this.list = [];

    this.db.collection('lists')
      .where('name', '==', name)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents: ' + name);
          return;
        }

        this.list.push(snapshot);
        // this.setCurrentList(snapshot.docs[0].data().name);

        // Récupération des tâches liées à la liste
        // this.taskService.getTasksByList(this.currentList);
      });

    return this.list;
  }

}
