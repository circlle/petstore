import { Category } from './category.entity';

export interface CategoryRO {
  category: Category;
}

export interface CategoriesRO {
  categories: Category[];
  count: number;
}
