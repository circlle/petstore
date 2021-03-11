import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as argon2 from 'argon2';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    default: '',
    unique: true,
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
