import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    default: '',
  })
  email: string;

  @Column({
    default: '',
  })
  phone: string;

  @Column({
    type: 'tinyint',
    default: 1,
  })
  status: number;

  @Column({
    default: '',
  })
  avatar: string;
}
