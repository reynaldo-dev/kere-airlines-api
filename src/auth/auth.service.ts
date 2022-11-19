import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
   constructor(private readonly userService: UserService, private readonly jwt: JwtService) {}

   async validateUser(email: string, password: string): Promise<any> {
      const user = await this.userService.findOne(email);
      const isMatch = user ? await compare(password, user?.password) : false;

      if (user && isMatch) {
         const { password, ...result } = user;
         return result;
      }
      return null;
   }

   async login(user: LoginDto) {
      const { email, username, role } = await this.userService.findOne(user.email);
      const payload = { email, username, role };
      return {
         access_token: this.jwt.sign(payload),
      };
   }
}
