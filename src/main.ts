import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './middlewares/excepion.filter';
import { setupSwagger } from './plugins/swagger.plugin';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));
  //ConfigService use for reading .env variables
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');
  //For details of why swagger use in this project go to swagger file--swagger.plugin.ts
  await setupSwagger(app,configService)
  //Global Exception middleware for catch any exception over project
  app.useGlobalFilters(new ExceptionsFilter());
  //Global pipelines for type validation for class validator
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  await app.listen( 4000,()=>console.log(`Listening from port 4000`));
}

bootstrap();
