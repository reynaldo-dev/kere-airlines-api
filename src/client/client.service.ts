import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
   constructor(private readonly prisma: PrismaService) {}
   async create(createClientDto: CreateClientDto) {
      const isIn = await this.prisma.userr.findUnique({
         where: {
            email: createClientDto.email,
         },
      });

      const isClientAlready = await this.prisma.client.findUnique({
         where: {
            email: createClientDto.email,
         },
      });

      if (!isIn) {
         throw new NotFoundException('Para ser parte de nuestros clientes, primero debe tener su cuenta de usuario');
      } else if (isClientAlready) {
         throw new BadRequestException('Este cliente ya existe');
      }

      return await this.prisma.client.create({
         data: {
            name: createClientDto.name,
            lastname: createClientDto.lastname,
            dir: createClientDto.dir,
            id_gender: createClientDto.id_gender,
            email: isIn.email,
            dui: createClientDto.dui,
            id_user: isIn.id_user,
         },
         include: {
            userr: true,
         },
      });
   }

   findAll() {
      return this.prisma.client.findMany({
         include: {
            userr: true,
         },
      });
   }

   findOne(id: number) {
      return `This action returns a #${id} client`;
   }

   update(id: number) {
      return `This action updates a #${id} client`;
   }

   remove(id: number) {
      return `This action removes a #${id} client`;
   }
}
