import { Component } from '@angular/core';

import { SidebarService } from './sidebar.service';

import { SidebarItem } from '../../../models/sidebar-item-model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  routes: SidebarItem[] = [];

  constructor(private _sidebar: SidebarService) {
    this.routes = this._sidebar.getRoleRoutes();
  }
}
