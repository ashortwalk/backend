import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { IoAdapter } from '@nestjs/platform-socket.io';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://ashortwalk-gkd3dvdpfcexb0ce.koreacentral-01.azurewebsites.net',
    ],
    credentials: true,
    exposedHeaders: ['Authorization', 'appKey'], // * 사용할 헤더 추가.
  });
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
