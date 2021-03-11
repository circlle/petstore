import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PetModule } from './pet/pet.module';
import credential from './credentials';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...credential,
      type: 'mysql',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
    }),
    UserModule,
    CategoryModule,
    PetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
