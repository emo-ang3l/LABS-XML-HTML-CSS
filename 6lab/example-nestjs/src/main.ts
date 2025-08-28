import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Разрешаем запросы с этих источников
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Разрешённые методы
    allowedHeaders: ['Content-Type'], // Разрешённые заголовки
  });

  const publicPath = join(process.cwd(), 'public');
  console.log('Serving static files from:', publicPath);
  app.useStaticAssets(publicPath);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();