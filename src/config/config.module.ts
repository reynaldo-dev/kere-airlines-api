import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as ConfModule } from '@nestjs/config';
import { configSchema } from './configuration-schema';

@Module({
   imports: [
      ConfModule.forRoot({
         isGlobal: true,
         envFilePath: '.env',
         load: [
            () => ({
               PORT: process.env.PORT,
               postgres: {
                  POSTGRES_HOST: process.env.POSTGRES_HOST,
                  POSTGRES_PORT: process.env.POSTGRES_PORT,
                  POSTGRES_USER: process.env.POSTGRES_USER,
                  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
                  POSTGRES_DB: process.env.POSTGRES_DB,
                  DATABSE_URL: process.env.DATABSE_URL,
                  JWT_SECRET: process.env.JWT_SECRET,
               },
            }),
         ],
         validationSchema: configSchema,
      }),
   ],
   controllers: [],
   providers: [],
})
export class ConfigModule {}
