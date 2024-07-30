import { Injectable } from '@angular/core';

import { AuthService } from './../../../../feature/auth/services/auth.service';

import { SidebarItem } from '../../../models/sidebar-item-model';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  role!: string | null;

  constructor(private _auth: AuthService) {
    this.role = this._auth.role;
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
        text: 'Users',
        iconClass: 'fas fa-user-group',
        routeTo: '/dashboard/user',
        present: this._auth.isAdmin(),
      },
      {
        text: 'Receipes',
        iconClass: 'fas fa-cubes-stacked',
        routeTo: 'receipes',
        present: true,
      },
      {
        text: 'Categories',
        iconClass: 'fas fa-table-cells',
        routeTo: 'categories',
        present: this._auth.isAdmin(),
      },
      {
        text: 'Favorites',
        iconClass: 'far fa-heart',
        routeTo: 'favourites',
        present: this._auth.isUser(),
      },
      {
        text: 'Change Password',
        iconClass: 'fas fa-unlock-keyhole',
        routeTo: 'change-password',
        present: this._auth.isAdmin(),
      },
      {
        text: 'Logout',
        iconClass: 'fas fa-right-from-bracket',
        routeTo: 'logout',
        present: true,
      },
    ];
  }
}
