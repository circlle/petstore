import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/http-exception.filter';
import { TransformInterceptor } from './core/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { SuccessResponseDto } from './core/generic.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Pet Store')
    .setDescription('The Pet Store description')
    .setVersion('1.0')
    .addTag('pet store')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [SuccessResponseDto],
  });
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(4000);
}
bootstrap();
