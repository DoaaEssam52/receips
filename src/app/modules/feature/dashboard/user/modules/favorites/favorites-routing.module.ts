import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesComponent } from './favorites.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritesComponent,
    children: [{ path: '', component: FavoritesListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
