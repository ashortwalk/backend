// src/chat/chat.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { MemberService } from 'src/group/services/member.service';
import { SocketAuthGuard } from 'src/user/guard';
import { MessageService } from './services/message.service';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://ashortwalk-gkd3dvdpfcexb0ce.koreacentral-01.azurewebsites.net',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private users: { [key: string]: string } = {}; // 사용자 목록
  private rooms: { [key: string]: string[] } = {}; // 채팅방 목록

  constructor(
    private readonly memberService: MemberService,
    private readonly messageService: MessageService,
  ) {}

  @UseGuards(SocketAuthGuard)
  async handleConnection(socket: Socket): Promise<void> {
    const user = socket.data.user;
    const groupId = socket.handshake.query.groupId as string;
    if (user.role !== 'admin') {
      // 그룹 멤버 여부 확인
      const isMember = await this.memberService.findMember(groupId, user.id);

      if (!isMember) {
        socket.emit('error', 'You are not a member of this group');
        socket.disconnect();
        return;
      }
    }

    const nickname = user.nickname; // 인증된 사용자 이름
    this.users[socket.id] = nickname; // 사용자 등록
    socket.emit('login:success', { nickname });
    this.server.emit('update:users', Object.values(this.users));
  }

  // 소켓 연결 해제 시 처리
  async handleDisconnect(socket: Socket): Promise<void> {
    const nickname = this.users[socket.id];
    if (nickname) {
      // 모든 방에서 유저 제거
      for (const room of Object.keys(this.rooms)) {
        const index = this.rooms[room].indexOf(socket.id);
        if (index !== -1) {
          this.rooms[room].splice(index, 1);
          await this.messageService.saveMessage(
            nickname,
            room,
            nickname + ' 님이 입장하셨습니다.',
          );
          this.server.to(room).emit('user:left', nickname);
        }
      }

      delete this.users[socket.id];
      this.server.emit('update:users', Object.values(this.users)); // 사용자 목록 갱신
    }
  }

  // 채팅방 참가 처리
  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('join:room')
  async handleJoinRoom(
    socket: Socket,
    @MessageBody() { room, groupId }: { room: string; groupId: string },
  ) {
    const user = socket.data.user;

    // 그룹 멤버 여부 확인
    const isMember = await this.memberService.findMember(user.id, groupId);

    if (!isMember) {
      socket.emit('error', 'You are not a member of this group');
      return;
    }

    // 채팅방에 참가
    socket.join(room);

    // 방에 사용자 추가
    if (!this.rooms[room]) {
      this.rooms[room] = [];
    }
    this.rooms[room].push(socket.id);
    await this.messageService.saveMessage(
      user.nickname,
      room,
      user.nickname + ' 님이 입장하셨습니다.',
    );

    socket.emit('room:joined', room);
    socket.to(room).emit('user:joined', user.nickname);
  }

  // 메시지 전송 처리
  @SubscribeMessage('chat:message')
  async handleChatMessage(
    socket: Socket,
    @MessageBody() { room, message }: { room: string; message: string },
  ) {
    const user = this.users[socket.id];

    // MongoDB에 메시지 저장
    await this.messageService.saveMessage(user, room, message);

    // 방에 메시지 전송
    this.server.to(room).emit('chat:message', { user, message });
  }
}
