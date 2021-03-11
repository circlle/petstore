import { PetStatus } from './pet.entity';

export class GetPetFiltersDto {
  category: number;
  status: PetStatus;
}
