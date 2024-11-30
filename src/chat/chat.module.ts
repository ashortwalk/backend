import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './services/message.service';
import { ChatGateway } from './chat.gateway';
import { MessageModel, MessageSchema } from './schemas/message.schema';
import { GroupModule } from 'src/group/group.module'; // 그룹 관련 서비스 임포트
import { AuthModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MessageModel.name, schema: MessageSchema },
    ]),
    GroupModule,
    AuthModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ChatGateway, MessageService],
})
export class ChatModule {}
