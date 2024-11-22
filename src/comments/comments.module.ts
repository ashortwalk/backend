import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './services';
import { CommentsRepository } from './repositories';
import { CommentsController } from './controllers';
import { AuthModule } from 'src/user/user.module';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Comment]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  exports: [],
})
export class CommentModule {}
