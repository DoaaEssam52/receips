import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';

@NgModule({
  declarations: [RecipesComponent, RecipesListComponent, AddEditRecipeComponent],
  imports: [CommonModule, RecipesRoutingModule, SharedModule],
})
export class RecipesModule {}
