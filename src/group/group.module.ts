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

dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forFeature([GroupEntity, MemberEntity]),
        AuthModule,
        JwtModule.register({ secret: process.env.JWT_SECRET }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [GrpupController],
    providers: [GroupService, GroupRepository],
    exports: [GroupRepository],
})
export class GroupModule { }
