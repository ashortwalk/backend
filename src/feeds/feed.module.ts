import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/user/user.module';
import { FeedEntity } from './entities/feed.entity';


dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedEntity]),
    AuthModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class FeedModule {}