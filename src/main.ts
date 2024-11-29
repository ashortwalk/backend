import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: ['ashortwalk-gkd3dvdpfcexb0ce.koreacentral-01.azurewebsites.net'],
    credentials: true,
    exposedHeaders: ['Authorization', 'appKey'], // * 사용할 헤더 추가.
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
