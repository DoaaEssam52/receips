import { Category } from './category-model';

export interface GetCategoriesListResponse {
  pageNumber: number;
  pageSize: number;
  data: Category[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}
