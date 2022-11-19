import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [ConfigModule, PrismaModule, AuthModule, UserModule, ClientModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
