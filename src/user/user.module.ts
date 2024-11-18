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
import { UserController } from './controllers/user.controller';
import { PassportModule } from '@nestjs/passport';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    Mail,
    AccessTokenRepository,
    RefreshTokenRepository,
    KakaoStrategy,
    UserService,
    AuthService,
    RedisModule,
    UserRepository,
  ],
  exports: [UserRepository],
})
export class AuthModule {}
