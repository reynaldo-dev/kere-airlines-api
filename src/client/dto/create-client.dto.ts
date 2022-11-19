import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClientDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   name: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   lastname: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   dir: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   dui: string;

   @ApiProperty({ example: 2 })
   @IsNumber()
   @IsNotEmpty()
   id_gender: number;

   @ApiProperty()
   @IsEmail()
   @IsNotEmpty()
   email: string;
}
