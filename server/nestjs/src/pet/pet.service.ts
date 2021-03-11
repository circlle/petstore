import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet, PetStatus } from './pet.entity';
import { PetRO, PetsRO } from './pet.interface';
import { CategoryService } from '../category/category.service';
import { GetPetFiltersDto } from './pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    private categoryService: CategoryService,
  ) {}

  async getPetById(id: number) {
    const maybePet = await this.petRepository.findOne(id, {
      relations: ['category'],
    });
    return maybePet && this.buildPetRO(maybePet);
  }

  async getPetsByFilters(filters: GetPetFiltersDto): Promise<PetsRO> {
    const filter: { categoryId?: number; status?: PetStatus } = {};
    if (typeof filters.category === 'number') {
      filter.categoryId = filters.category;
    }
    if (typeof filters.status === 'string') {
      filter.status = filters.status;
    }
    const [pets = [], count = 0] = await this.petRepository.findAndCount({
      where: {
        ...filter,
      },
      relations: ['category'],
    });
    const returnPets = pets.map((pet) => this.buildPetRO(pet));
    return { pets: returnPets, count: count };
  }

  buildPetRO(pet: Pet) {
    const petRO: PetRO = {
      id: pet.id,
      name: pet.name,
      category: this.categoryService.buildCategoryRO(pet.category),
      photoUrls: pet.photoUrls,
      status: pet.status,
      price: pet.price,
      // don't return costPrice
    };
    return petRO;
  }
}
