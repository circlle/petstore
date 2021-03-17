import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetRO } from './pet.interface';
import { PetStatus } from './pet.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pet')
@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Get(':petId')
  async getPetById(@Param('petId') id: number): Promise<PetRO> {
    return this.petService.getPetById(id);
  }
  @Get()
  getByFilters(
    @Query('category', ParseIntPipe) category: number,
    @Query('status') status: PetStatus,
  ) {
    return this.petService.getPetsByFilters({ category, status });
  }
}
