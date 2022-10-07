import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { UserProfile } from '@/api/user/user.profile';
import { PassportModule } from '@nestjs/passport';
import { ServiceModule } from '@/service/service.module';
import { UserRepository } from '@/api/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    NestjsFormDataModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ServiceModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserProfile, UserRepository],
  exports: [UserService],
})
export class UserModule {}
