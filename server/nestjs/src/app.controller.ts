import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(e) {}

  @Get()
  getHello(): string {
    return 'Hello world!';
  }
}
