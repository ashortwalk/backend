import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { PostsModule } from './posts/post.module';
import { RedisModule } from './common/redis';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),

    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [JwtStrategy, RedisModule],
})
export class AppModule {}
