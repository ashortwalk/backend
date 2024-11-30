import { CanActivate, Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket: Socket = context.switchToWs().getClient();
    const token = socket.handshake.auth.token;

    if (!token) {
      return false;
    }

    try {
      const user = this.jwtService.verify(token, {
        secret: process.env.ACCESS_JWT_SECRET,
      });
      socket.data.user = user;
      return true;
    } catch (err) {
      return false;
    }
  }
}
