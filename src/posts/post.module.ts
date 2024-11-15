import { Module } from '@nestjs/common';
import { PostsController } from './controllers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [PostsController],
  providers: [],
  exports: [],
})
export class PostsModule {}
