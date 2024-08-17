import { Component, EventEmitter, Output } from '@angular/core';

import { SidebarService } from '../../services/sidebar.service';

import { SidebarItem } from '../../models/sidebar-item-model';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() collapseSidebar = new EventEmitter();

  routes: SidebarItem[] = [];

  activeRoute: string = '';

  isCollapsed = false;

  constructor(private _sidebar: SidebarService) {
    this.routes = this._sidebar.getRoleRoutes();

    this.collapseSidebar.emit(this.isCollapsed);
  }

  toggleSideBarExpansion(): void {
    const sidebar = document.getElementById('sidebar');

    this.isCollapsed = !this.isCollapsed;
    
    sidebar?.classList.toggle('collapsed');
    this.collapseSidebar.emit(this.isCollapsed);
  }

  setActiveRoute(routeTo: string): void {
    this.activeRoute = routeTo;
  }
}
