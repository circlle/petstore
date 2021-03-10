import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './user.dto';
import { UserRO } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<UserRO> {
    const maybeUser = await this.userService.findByName(username);
    return maybeUser;
  }

  @Get('/login')
  async login(@Query() query: LoginDto): Promise<UserRO> {
    const _user = await this.userService.findByName(query.username);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 400);

    return _user;
  }
}
