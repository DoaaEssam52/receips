import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ListHeader } from '../../models/list-model';

import { environment } from 'src/app/core/environments/environment';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Output() handleViewEvent = new EventEmitter();
  @Output() handleEditEvent = new EventEmitter();
  @Output() handeDeleteEvent = new EventEmitter();
  @Output() handeFavoriteEvent = new EventEmitter();
  @Output() handlePageEvent = new EventEmitter();

  @Input() headers: ListHeader[] = [];
  @Input() data: any[] = [];

  @Input() length: number = 0;
  @Input() pageNumber: number = 0;
  @Input() pageSize: number = 10;
  @Input() showFirstLastButtons: boolean = true;
  @Input() showPageSizeOptions: boolean = true;
  @Input() pageSizeOptions: number[] = [5, 10, 25];
  @Input() hidePageSize = false;
  @Input() disabled = false;

  imageUrl: string = '';

  constructor() {
    this.imageUrl = environment.imageUrl;
  }

  view(row: any): void {
    this.handleViewEvent.emit(row);
  }

  edit(row: any): void {
    this.handleEditEvent.emit(row);
  }

  delete(id: number): void {
    this.handeDeleteEvent.emit(id);
  }

  favorite(id: number): void {
    this.handeFavoriteEvent.emit(id);
  }

  paginate(e: any): void {
    this.handlePageEvent.emit(e);
  }
}
