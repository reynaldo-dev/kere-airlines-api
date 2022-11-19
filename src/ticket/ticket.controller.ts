import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { enumRoles } from 'src/auth/roles.enum';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketService } from './ticket.service';

@ApiTags('ticket administration')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ticket')
export class TicketController {
   constructor(private readonly ticketService: TicketService) {}

   @ApiOperation({ summary: 'Post new ticket' })
   @Roles(enumRoles.client)
   @UseGuards(RoleGuard)
   @Post()
   create(@Body() createTicketDto: CreateTicketDto) {
      return this.ticketService.create(createTicketDto);
   }

   @ApiOperation({ summary: 'Get all tickets' })
   @Roles(enumRoles.admin)
   @UseGuards(RoleGuard)
   @Get()
   findAll() {
      return this.ticketService.findAll();
   }
}
