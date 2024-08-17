import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { CategoriesComponent } from '../categories/categories.component';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';

@NgModule({
  declarations: [CategoriesComponent, AddEditCategoryComponent],
  imports: [CommonModule, CategoriesRoutingModule, SharedModule],
})
export class CategoriesModule {}
