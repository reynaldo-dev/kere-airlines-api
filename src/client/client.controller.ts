import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { enumRoles } from 'src/auth/roles.enum';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@ApiTags('client administration')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('client')
export class ClientController {
   constructor(private readonly clientService: ClientService) {}

   @ApiOperation({ summary: 'Create one client' })
   @Roles(enumRoles.client)
   @UseGuards(RoleGuard)
   @Post()
   create(@Body() createClientDto: CreateClientDto) {
      return this.clientService.create(createClientDto);
   }

   @ApiOperation({ summary: 'Get all clients' })
   @Roles(enumRoles.admin)
   @UseGuards(RoleGuard)
   @Get()
   findAll() {
      return this.clientService.findAll();
   }

   @Get(':id')
   findOne(@Param('id') id: string) {
      return this.clientService.findOne(+id);
   }

   @Patch(':id')
   update(@Param('id') id: string) {
      return this.clientService.update(+id);
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.clientService.remove(+id);
   }
}
