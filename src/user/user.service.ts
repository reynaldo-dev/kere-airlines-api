import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
   constructor(private readonly prisma: PrismaService) {}

   async create(createUserDto: CreateUserDto) {
      const isAlready = await this.prisma.userr.findFirst({
         where: {
            email: createUserDto.email,
         },
      });

      if (isAlready) {
         throw new BadRequestException('User already exists');
      }

      return await this.prisma.userr.create({
         data: {
            username: createUserDto.username,
            email: createUserDto.email,
            password: await hash(createUserDto.password, 10),
            id_role: createUserDto.id_role,
         },
         include: {
            role: true,
         },
      });
   }

   async findOne(email: string) {
      return await this.prisma.userr.findFirst({
         where: {
            email,
         },
         include: {
            role: true,
         },
      });
   }
}
