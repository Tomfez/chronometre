import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  private currentList: string;
  private lists = [];
  private list = [];
  private db = firebase.firestore();
  private listCollection: DocumentData;

  constructor() { }

  /**
   * getCurrentListName
   */
  getCurrentListName(): string {
    return this.currentList;
  }

  /**
   * setCurrentList
   * @param list: nom de la liste
   */
  setCurrentList(list: string) {
    this.currentList = list;
  }

  /**
   * createList
   * @param list: liste à créer
   */
  createList(list) {
    this.db.collection('lists').add({
      name: list.list
    }).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
  }

  /**
   * getAllLists
   */
  getAllLists() {
    this.lists = [];

    this.db.collection('lists').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.lists.push(doc.data());
        });

        // Liste par défaut (c'est la 1ère)
        // this.setCurrentList(snapshot.docs[0].data().name);

      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });

    return this.lists;
  }

  // setCurrentListCollection(list: string): void {
  //   this.db.collection('lists')
  //     .where('name', '==', list)
  //     .get()
  //     .then(querySnapshot => {
  //       if (!querySnapshot.empty) {
  //         this.listCollection = querySnapshot.docs[0].data();
  //         console.log(this.listCollection)
  //         // this.setCurrentList(querySnapshot.docs[0].data().name);
  //       }
  //     });
  // }
  //
  // getCurrentListCollection(): DocumentData {
  //   return this.listCollection;
  // }
}
