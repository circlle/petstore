import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './user.dto';
import { sign } from 'jsonwebtoken';
import { SECRET } from '../../config';
import { UserData, JWTInfo } from './user.interface';
import { validate } from 'class-validator';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // need verify
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
  // need verify
  async findByUserId(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async findByName(userName: string): Promise<UserData> {
    const user = await this.userRepository.findOne({ username: userName });
    return this.buildUserData(user);
  }

  async create(user: CreateUserDto): Promise<UserData> {
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
      return this.buildUserData(savedUser);
    }
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete(email);
  }

  public login(user: User) {
    return this.generateJWT(user);
  }

  private generateJWT(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const jwtInfo: JWTInfo = {
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    };

    return sign(jwtInfo, SECRET);
  }
  public buildUserData(user: User): UserData {
    const userData: UserData = {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      phone: user.phone,
    };
    return userData;
  }
  // public buildUserRO(user: User): UserRO {
  //   const userRO: UserRO = {
  //     user: {
  //       username: user.username,
  //       email: user.email,
  //       token: this.generateJWT(user),
  //       avatar: user.avatar,
  //     },
  //   };
  //   return userRO;
  // }
}
