import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
   @ApiProperty({ example: 10 })
   @IsNotEmpty()
   @IsNumber()
   id_client;

   @ApiProperty({ example: '2021-01-01' })
   @IsDateString()
   @IsNotEmpty()
   fromdate;

   @ApiProperty({ example: '2021-01-01' })
   @IsDateString()
   @IsNotEmpty()
   todate;

   @ApiProperty({ example: 'El Salvador' })
   @IsString()
   @IsNotEmpty()
   destination;

   @ApiProperty({ example: 'Univeristy' })
   @IsString()
   @IsNotEmpty()
   motive;

   @ApiProperty({ example: '2021-01-01' })
   @IsDateString()
   @IsNotEmpty()
   createdat;
}
