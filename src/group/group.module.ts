import { Module } from '@nestjs/common';
import { GrpupController } from './controllers';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { GroupEntity, MemberEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/user/user.module';
import { GroupService } from './services';
import { GroupRepository } from './repositories';
import { MemberController } from './controllers/member.controller';
import { MemberService } from './services/member.service';
import { MemberRepository } from './repositories/member.reopsitory';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity, MemberEntity]),
    AuthModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [GrpupController, MemberController],
  providers: [GroupService, GroupRepository, MemberService, MemberRepository],
  exports: [GroupRepository],
})
export class GroupModule {}
