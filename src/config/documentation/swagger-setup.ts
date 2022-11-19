import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

export const swaggerSetup = (app: INestApplication) => {
   const options = new DocumentBuilder()
      .setTitle('KERE - API DOCUMENTATION')
      .setDescription('Documentation for the KERE API')
      .setVersion('1.0')
      .addBasicAuth()
      .addBearerAuth()
      .build();
   const document = SwaggerModule.createDocument(app, options);
   SwaggerModule.setup('api/v1', app, document, {
      swaggerOptions: {
         persistAuthorization: true,
      },
   });
};
