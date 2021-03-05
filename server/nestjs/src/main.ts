import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Pet Store')
      .setDescription('The Pet Store description')
      .setVersion('1.0')
      .addTag('pet store')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
