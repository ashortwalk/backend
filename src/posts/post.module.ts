import { Module } from '@nestjs/common';
import { PostsController } from './controllers';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET })],
  controllers: [PostsController],
  providers: [],
  exports: [],
})
export class PostsModule {}
