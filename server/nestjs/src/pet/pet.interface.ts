import { CategoryRO } from '../category/category.interface';
import { PetStatus } from './pet.entity';

export interface PetRO {
  id: number;
  name: string;
  category: CategoryRO;
  photoUrls: string[];
  status: PetStatus;
  price: number;
}

export interface PetsRO {
  pets: PetRO[];
  count: number;
}
