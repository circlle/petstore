import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/getHello')
  getHello(): string {
    return "Hello world!"
  }
}
