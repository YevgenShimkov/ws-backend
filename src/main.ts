import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomConfigService } from '@src/custom-config/custom-config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://localhost:3000',
    credentials: true,
    preflightContinue: false,
  });
  app.setGlobalPrefix('api/');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(CustomConfigService);

  const port = configService.get<number>('APP_PORT');

  await app.listen(port, () => console.log('App is running on port ' + port));
}
bootstrap();
