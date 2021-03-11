import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';

export type PetStatus = 'available' | 'pending' | 'sold';
@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'double',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'double',
    nullable: false,
  })
  costPrice: number;

  @ManyToOne(() => Category)
  category: Category;
  @Column({ type: 'int', nullable: true })
  categoryId: number;

  @Column('simple-array')
  photoUrls: string[];

  @Column({
    type: 'enum',
    enum: ['available', 'pending', 'sold'],
    default: 'available',
  })
  status: PetStatus;
}
