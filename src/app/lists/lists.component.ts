import {Component, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ListService} from '../list.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})

export class ListsComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  public listForm: FormGroup;
  public lists = [];

  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
  ) { }

  ngOnInit() {
    this.listForm = this.formBuilder.group({
      list: [null, Validators.required]
    });

    this.getAllLists();
  }

  /**
   * get list
   */
  get list() {
    return this.listForm.get('list') as FormControl;
  }

  /**
   * Move list
   * @param event: event
   */
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }

  /**
   * onSubmit
   * @param form: formulaire
   */
  public onSubmit(form) {
    console.warn('Liste: ', form);

    if (this.listForm.invalid) {
      return;
    }

    this.createList(form);
  }

  /**
   * Ajout d'une nouvelle liste
   * @param list: liste
   */
  private createList(list) {
    this.listService.createList(list);
  }

  /**
   * Récupération de toutes les listes
   */
  private getAllLists() {
    this.lists = this.listService.getAllLists();
  }



  // public loadList(list) {
  //   this.db.collection('lists')
  //     .where('name', '==', list.name)
  //     .limit(1)
  //     .get()
  //     .then(snapshot => {
  //       if (snapshot.empty) {
  //         console.log('No matching documents: ' + list.name);
  //         return;
  //       }
  //
  //       this.listService.setCurrentList(snapshot.docs[0].data().name);
  //
  //       // Récupération des tâches liées à la liste
  //       this.taskService.getTasksByList(this.listService.getCurrentList());
  //     });
  // }

}
