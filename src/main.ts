import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['Authorization', 'appKey'], // * 사용할 헤더 추가.
  });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
