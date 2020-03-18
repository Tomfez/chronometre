import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent  {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  toDoForm: FormGroup;
  // done = [];

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor(private formBuilder: FormBuilder) {
    this.toDoForm = this.formBuilder.group({
      tache: [null, Validators.required]
    });
  }

  get tache() {
    return this.toDoForm.get('tache') as FormControl;
  }

  onSubmit(form) {
    console.warn('Tache: ', form);


    if (this.toDoForm.invalid) {
      return;
    }

    this.todo.push(form.tache);
    this.formDirective.resetForm();
    console.log(form.tache);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  clearDoneList() {
    this.done = [];
    return this.done;
  }

}
