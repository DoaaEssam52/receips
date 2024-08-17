import { Recipe } from './recipe-model';

export interface GetRecipesList {
  pageNumber: number;
  pageSize: number;
  data: Recipe[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}
