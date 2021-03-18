import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './user.dto';
import { LoginResult, UserData } from './user.interface';
import { DeleteResult } from 'typeorm';
import {
  ApiHeader,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FailedResponseDto } from '../core/generic.dto';

@ApiTags('user')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'UNAUTHORIZED',
  type: FailedResponseDto,
})
@ApiHeader({ name: 'Authorization', description: 'to verify' })
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UserData,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'all ready exist a user with same name',
    type: FailedResponseDto,
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserData> {
    const user = await this.userService.create(createUserDto);
    if (!user) {
      throw new HttpException("can't create this user", HttpStatus.CONFLICT);
    }
    return user;
  }

  @ApiNotFoundResponse({
    description: 'Not found',
    type: FailedResponseDto,
  })
  @Get(':username')
  async findMe(@Param('username') username: string): Promise<UserData> {
    const maybeUser = await this.userService.findByName(username);
    if (!maybeUser) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return maybeUser;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'deleted',
    type: UserData,
  })
  @Delete(':username')
  async delete(@Param('username') username: string): Promise<DeleteResult> {
    return await this.userService.delete(username);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'authorization success',
    type: LoginResult,
  })
  @Post('/login')
  async login(@Body() body: LoginDto): Promise<LoginResult> {
    const _user = await this.userService.findOne(body);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 400);

    return { token: this.userService.login(_user) };
  }
}
