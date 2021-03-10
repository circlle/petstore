import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { sign } from 'jsonwebtoken';
import { SECRET } from '../../config';
import { UserRO } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }
  async findByName(userName: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ username: userName });
    return this.buildUserRO(user);
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  private generateJWT(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }
  public buildUserRO(user: User): UserRO {
    const userRO: UserRO = {
      user: {
        username: user.username,
        email: user.email,
        token: this.generateJWT(user),
        avatar: user.avatar,
      },
    };
    return userRO;
  }
}
