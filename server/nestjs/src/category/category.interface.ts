import { Category } from './category.entity';

export type CategoryRO = Category;

export interface CategoriesRO {
  categories: Category[];
  count: number;
}
