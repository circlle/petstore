import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { Category } from '../category/category.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Category]), CategoryModule],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
