import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PageEvent } from '@angular/material/paginator';

import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './services/users.service';

import { User } from './models/user-model';
import { ListHeader } from '../../../../../../modules/shared/models/list-model';

import { DeleteItemComponent } from '../../../../../../modules/shared/components/delete-item/delete-item.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  usersList!: User[];

  headers: ListHeader[] = [];

  length: number = 0;
  pageSize = 10;
  pageNumber = 0;

  deleteDialogRef: any;

  usersSubscription!: Subscription;

  pageEvent!: PageEvent;

  filterForm = new FormGroup({
    searchValue: new FormControl(''),
    searchKey: new FormControl(''),
  });

  searchByKeys = ['userName', 'email', 'country'];

  constructor(private _users: UsersService, public dialog: MatDialog) {
    this.headers = this._users.listHeaders;
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList(): void {
    this._users
      .getUsersList(
        this.pageNumber,
        this.pageSize,
        this.filterForm.controls.searchKey.value ?? '',
        this.filterForm.controls.searchValue.value ?? ''
      )
      .subscribe({
        next: ({ data, totalNumberOfRecords }) => {
          this.usersList = this._users.handleUsersListResponse(data);
          this.length = totalNumberOfRecords;
        },
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getUsersList();
  }

  openViewUser(user: User): void {
    this.dialog.open(ViewUserComponent, {
      data: { user },
    });
  }

  openDeleteUser(id: number): void {
    this.deleteDialogRef = this.dialog.open(DeleteItemComponent, {
      data: { id, name: 'User' },
    });

    this.deleteDialogRef.afterClosed().subscribe((result: { id: number }) => {
      this.deleteUser(result.id);
    });
  }

  deleteUser(id: number): void {
    this._users.deleteUser(id).subscribe({
      next: () => this.getUsersList(),
    });
  }

  filter(): void {
    this.pageNumber = 0;

    this.getUsersList();
  }

  resetFilter(): void {
    this.pageNumber = 0;
    this.filterForm.reset();

    this.getUsersList();
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
