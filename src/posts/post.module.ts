import { Module } from '@nestjs/common';
import { PostsController } from './controllers';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { PostEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './services/posts.service';
import { AzureBlobService } from './services/azure-blob.service';
import { PostRepository } from './repositories/posts.repository';
import { AuthModule } from 'src/user/user.module';
import { ResizeImagePipe } from './services/resize.service';
import { StatisticsController } from './controllers/statistics.controller';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    AuthModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PostsController, StatisticsController],
  providers: [PostService, PostRepository, AzureBlobService, ResizeImagePipe],
  exports: [PostRepository],
})
export class PostsModule {}
