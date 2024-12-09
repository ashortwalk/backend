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
import { ReportEntity, UserEntity } from './entities';
import { Gmail } from 'src/common';
import { RedisModule } from 'src/common/redis';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserController } from './controllers/user.controller';
import { PassportModule } from '@nestjs/passport';
import { ReportRepository } from './repositories/reports.repository';
import { ReportService } from './services/reports.service';
import { ReportController } from './controllers/report.controller';
import { HttpModule } from '@nestjs/axios';
import { PostRepository } from 'src/posts/repositories/posts.repository';
import { CommentsRepository } from 'src/comments/repositories';
import { PostEntity } from 'src/posts/entities';
import { CommentEntity } from 'src/comments/entities';
import { AuthGuard } from './guard';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ReportEntity,
      PostEntity,
      CommentEntity,
    ]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HttpModule,
  ],
  controllers: [AuthController, UserController, ReportController],
  providers: [
    PostRepository,
    CommentsRepository,
    Gmail,
    AccessTokenRepository,
    RefreshTokenRepository,
    KakaoStrategy,
    UserService,
    AuthService,
    RedisModule,
    UserRepository,
    ReportService,
    ReportRepository,
    AuthGuard,
  ],
  exports: [UserRepository],
})
export class AuthModule {}
