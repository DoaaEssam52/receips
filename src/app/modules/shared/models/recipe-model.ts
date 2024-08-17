import { Category } from './category-model';

export interface Recipe {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: Category[];
  tag: {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
  };
}
