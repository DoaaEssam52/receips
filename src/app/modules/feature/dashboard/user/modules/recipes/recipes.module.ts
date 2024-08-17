import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';

import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';

@NgModule({
  declarations: [RecipesComponent, RecipesListComponent, ViewRecipeComponent],
  imports: [CommonModule, RecipesRoutingModule, SharedModule],
})
export class RecipesModule {}
