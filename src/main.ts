import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose', 'error', 'warn'],
  });

  // Get Services
  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    origin: '*',
  });

  try {
    const PORT = configService.getOrThrow<number>('PORT');
    await app.listen(PORT, () => {
      Logger.verbose(`Server Running on http://localhost:${PORT}`, 'BOOTSTRAP');
    });
  } catch (err) {
    Logger.error(`START SERVER FAILD ERROR : ${JSON.stringify(err)}`);
  }
}
bootstrap();
