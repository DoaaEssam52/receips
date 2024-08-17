import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites-service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
})
export class FavoritesListComponent implements OnInit, OnDestroy {
  favoriteList!: any[];

  length: number = 0;
  pageSize = 5;
  pageNumber = 0;
  showFirstLastButtons: boolean = true;
  showPageSizeOptions: boolean = true;
  pageSizeOptions: number[] = [5, 10, 25];
  hidePageSize = false;
  disabled = false;

  getFavoriteSubscription!: Subscription;

  pageEvent!: PageEvent;

  constructor(private _favorites: FavoritesService) {}

  ngOnInit(): void {
    this.getFavoriteList();
  }

  getFavoriteList(): void {
    this.getFavoriteSubscription = this._favorites
      .getFavoriteRecipes(this.pageNumber, this.pageSize)
      .subscribe({
        next: ({ data, totalNumberOfRecords }) => {
          this.favoriteList = data;
          this.length = totalNumberOfRecords;
        },
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getFavoriteList();
  }

  ngOnDestroy(): void {
    if (this.getFavoriteSubscription) {
      this.getFavoriteSubscription.unsubscribe();
    }
  }
}
