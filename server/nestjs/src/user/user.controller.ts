import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/getHello')
  getHello(): string {
    return "Hello world!"
  }

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto)
    return user;
  }

  @Get('/getAll')
  getAll(): Promise<User[]> {
    return this.userService.findAll()
  }
}
