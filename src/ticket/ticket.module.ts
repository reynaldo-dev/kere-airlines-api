import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
   imports: [UserModule, AuthModule, PrismaModule],
   controllers: [TicketController],
   providers: [TicketService],
})
export class TicketModule {}
