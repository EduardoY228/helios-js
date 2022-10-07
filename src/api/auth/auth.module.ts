import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@/api/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@/api/auth/auth.controller';
import { LocalStrategy } from '@/api/auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/api/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
