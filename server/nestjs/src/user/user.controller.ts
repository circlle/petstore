import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './user.dto';
import { UserData } from './user.interface';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  /*
   * create a new user
   */
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserData> {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Get(':username')
  async findMe(@Param('username') username: string): Promise<UserData> {
    const maybeUser = await this.userService.findByName(username);
    return maybeUser;
  }

  @Delete(':username')
  async delete(@Param('username') username: string): Promise<DeleteResult> {
    return await this.userService.delete(username);
  }

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<string> {
    const _user = await this.userService.findOne(body);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 400);

    return this.userService.login(_user);
  }
}
