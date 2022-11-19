import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
   @ApiProperty({ example: 1, description: 'role ID' })
   @IsNotEmpty()
   @IsNumber()
   id_role: number;

   @ApiProperty({ example: 'John Doe', description: 'username' })
   @IsNotEmpty()
   @IsString()
   username: string;

   @ApiProperty({ example: 'jhondoe@gemail.com', description: 'user email' })
   @IsNotEmpty()
   @IsEmail()
   email: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   @MinLength(8)
   password: string;
}
