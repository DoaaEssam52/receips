import { Component } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';

import { SidebarItem } from '../../models/sidebar-item-model';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  routes: SidebarItem[] = [];

  activeRoute: string = '';

  isCollapsed = false;

  constructor(private _sidebar: SidebarService) {
    this.routes = this._sidebar.getRoleRoutes();
  }

  toggleSideBarExpansion(): void {
    const sidebar = document.getElementById('sidebar');

    sidebar?.classList.toggle('collapsed');
    this.isCollapsed = !this.isCollapsed;
  }

  setActiveRoute(routeTo: string): void {
    this.activeRoute = routeTo;
  }
}
