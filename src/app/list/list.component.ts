import {Component, OnInit} from '@angular/core';
import {ListService} from '../list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  public list: string;

  /**
   * Constructor
   * @param listService: ListService
   * @param route: ActivatedRoute
   */
  constructor(
    private listService: ListService,
    private route: ActivatedRoute
  ) {
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    const listName = this.route.snapshot.paramMap.get('name');
    this.listService.setCurrentList(listName);
    this.list = this.listService.getCurrentListName();
  }

}
