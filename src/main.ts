import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { swaggerSetup } from './config/documentation/swagger-setup';

async function bootstrap() {
   const configService = new ConfigService();
   const app = await NestFactory.create(AppModule, { cors: true });
   app.use(helmet());
   app.useGlobalPipes(new ValidationPipe());
   app.setGlobalPrefix('api/v1');
   swaggerSetup(app);
   await app.listen(configService.get('PORT'));
}
bootstrap();
