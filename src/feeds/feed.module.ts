import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/user/user.module';
import { FeedEntity } from './entities/feed.entity';
import { GroupModule } from 'src/group/group.module';
import { FeedController } from './controllers/feed.controllers';
import { FeedService } from './services/feed.services';
import { FeedRepository } from './repositories/feed.repositories';


dotenv.config();

@Module({
  imports: [
    GroupModule,
    TypeOrmModule.forFeature([FeedEntity]),
    AuthModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [FeedController],
  providers: [FeedService, FeedRepository],
  exports: [],
})
export class FeedModule { }