import { Module } from '@nestjs/common';
import { KakaoStrategy } from './strategies';
import { AuthController } from './controllers';
import { AuthService, UserService } from './services';
import {
  AccessTokenRepository,
  RefreshTokenRepository,
  UserRepository,
} from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { Mail } from 'src/common';
import { RedisModule } from 'src/common/redis';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AuthController],
  providers: [
    Mail,
    UserRepository,
    AccessTokenRepository,
    RefreshTokenRepository,
    KakaoStrategy,
    UserService,
    AuthService,
    RedisModule,
  ],
  exports: [
    Mail,
    UserRepository,
    AccessTokenRepository,
    RefreshTokenRepository,
    KakaoStrategy,
    UserService,
    AuthService,
    RedisModule,
  ],
})
export class AuthModule {}
