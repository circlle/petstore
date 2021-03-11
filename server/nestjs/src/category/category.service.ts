import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoriesRO, CategoryRO } from './category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async findAll(): Promise<CategoriesRO> {
    const [categories, count] = await this.categoryRepository.findAndCount();
    const newCategories = categories.map((category) => {
      return this.buildCategoryRO(category);
    });
    return { categories: newCategories, count };
  }

  public buildCategoryRO(category: Category): CategoryRO {
    const { id, image, description, name, zh_name } = category;
    const categoryRO: CategoryRO = {
      id,
      image,
      description,
      name,
      zh_name,
    };
    return categoryRO;
  }
}
