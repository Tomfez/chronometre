import {Component, OnInit} from '@angular/core';
import {ListService} from '../list.service';
import {TaskService} from '../task.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  public list: string;

  /**
   * Constructor
   * @param route: ActivatedRoute
   * @param listService: ListService
   * @param taskService: TaskService
   */
  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private taskService: TaskService
  ) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.list = this.getCurrentList();
  }

  public getCurrentList() {
    return this.listService.getCurrentList();
    // const name = +this.route.snapshot.paramMap.get('name');
    // this.listService.getList(name);
  }

}
