import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { Task } from '../task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {


  newTask() {
    throw new Error('Method not implemented.');
  }


}
