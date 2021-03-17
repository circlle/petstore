import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoriesRO } from './category.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoriesRO> {
    const { categories, count } = await this.categoryService.findAll();
    return {
      categories,
      count,
    };
  }
}
