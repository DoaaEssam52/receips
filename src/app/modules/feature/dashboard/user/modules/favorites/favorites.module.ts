import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { FavoritesComponent } from './favorites.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { FavoritesCardComponent } from './components/favorites-card/favorites-card.component';

@NgModule({
  declarations: [FavoritesComponent, FavoritesListComponent, FavoritesCardComponent],
  imports: [CommonModule, FavoritesRoutingModule, SharedModule],
})
export class FavoritesModule {}
