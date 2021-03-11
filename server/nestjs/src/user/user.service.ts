import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './user.dto';
import { sign } from 'jsonwebtoken';
import { SECRET } from '../../config';
import { UserRO } from './user.interface';
import { validate } from 'class-validator';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne({ username, password }: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      return null;
    }
    if (await argon2.verify(user.password, password)) {
      return user;
    }
    return null;
  }

  async findByName(userName: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ username: userName });
    return this.buildUserRO(user);
  }

  async create(user: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username/email
    const { username, email, password } = user;
    const maybeUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getOne();

    if (maybeUser) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);

    if (errors.length > 0) {
      const _errors = { username: 'User input is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
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
