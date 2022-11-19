import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConf } from './jwt/jwtConfiguration';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
   imports: [PrismaModule, UserModule, PassportModule, jwtConf],
   controllers: [AuthController],
   providers: [AuthService, LocalStrategy, JwtStrategy],
   exports: [AuthService],
})
export class AuthModule {}
