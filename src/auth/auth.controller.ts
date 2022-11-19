import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @ApiOperation({ summary: 'login' })
   @UseGuards(LocalAuthGuard)
   @Post('login')
   login(@Req() req, @Body() body: LoginDto) {
      return this.authService.login(req.user);
   }

   @ApiOperation({ summary: 'See who am i based on token' })
   @ApiBearerAuth()
   @UseGuards(JwtAuthGuard)
   @Get('whoami')
   whoami(@Req() req) {
      return req.user;
   }
}
