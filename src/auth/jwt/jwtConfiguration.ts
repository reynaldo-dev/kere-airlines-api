import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

const configService = new ConfigService();
export const jwtConf = JwtModule.register({
   secret: configService.get('JWT_SECRET'),
   signOptions: { expiresIn: '1d' },
});
