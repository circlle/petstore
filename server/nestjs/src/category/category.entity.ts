import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column()
  zh_name: string;

  @Column()
  image: string;

  @Column()
  description: string;
  //
  // @OneToMany(() => Pet, (pet) => pet.category)
  // pets: Pet[];
}
