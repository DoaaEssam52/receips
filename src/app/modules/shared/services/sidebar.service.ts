import { Injectable } from '@angular/core';

import { AuthService } from '../../feature/auth/services/auth.service';

import { SidebarItem } from '../models/sidebar-item-model';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  role!: string | null;
  roleInUrl: string = '';

  changePasswordDialogRef: any;

  constructor(private _auth: AuthService, public dialog: MatDialog) {
    this.role = this._auth.role;
    this.roleInUrl = this._auth.isUser() ? 'user' : 'admin';
  }

  getRoleRoutes(): SidebarItem[] {
    return [
      {
        text: 'Home',
        iconClass: 'fas fa-house',
        routeTo: '/dashboard/home',
        present: true,
      },
      {
        text: 'Categories',
        iconClass: 'fas fa-table-cells',
        routeTo: '/dashboard/admin/categories',
        present: this._auth.isAdmin(),
      },
      {
        text: 'Recipes',
        iconClass: 'fas fa-cubes-stacked',
        routeTo: '/dashboard/' + this.roleInUrl + '/recipes/list',
        present: true,
      },
      {
        text: 'Users',
        iconClass: 'fas fa-user-group',
        routeTo: '/dashboard/admin/users',
        present: this._auth.isAdmin(),
      },
      {
        text: 'Favorites',
        iconClass: 'far fa-heart',
        routeTo: '/dashboard/user/favorites',
        present: this._auth.isUser(),
      },
      {
        text: 'Change Password',
        iconClass: 'fas fa-unlock-keyhole',
        onClick: () => this.openChangePasswordDialog(),
        present: this._auth.isAdmin(),
        routeTo: 'change-password'
      },
    ];
  }

  openChangePasswordDialog(): void {
    this.changePasswordDialogRef = this.dialog.open(ChangePasswordComponent, {
      minWidth: '50%',
    });

    this.changePasswordDialogRef
      .afterClosed()
      .subscribe((result: { name: string; id: any }) => {});
  }
}
