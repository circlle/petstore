import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.POST },
        { path: 'user/:username', method: RequestMethod.DELETE },
        { path: 'user/:username', method: RequestMethod.GET },
      );
  }
}
