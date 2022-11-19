import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
   constructor(private readonly prisma: PrismaService) {}

   async create(createTicketDto: CreateTicketDto) {
      const isClient = await this.prisma.client.findUnique({
         where: {
            id_client: createTicketDto.id_client,
         },
      });

      if (!isClient) {
         throw new NotFoundException('No existe el cliente que está solicitando el ticket');
      }

      return await this.prisma.ticket.create({
         data: {
            id_client: createTicketDto.id_client,
            fromdate: createTicketDto.fromdate,
            todate: createTicketDto.todate,
            destination: createTicketDto.destination,
            motive: createTicketDto.motive,
            createdat: new Date(),
         },
         include: {
            client: true,
         },
      });
   }

   async findAll() {
      return await this.prisma.ticket.findMany({
         include: {
            client: true,
         },
      });
   }
}
