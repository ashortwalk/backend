import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      throw new ForbiddenException('No roles provided');
    }

    const request: Request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new ForbiddenException('Authorization header missing');
    }

    const [bearer, accessToken] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
      throw new ForbiddenException('Invalid token format');
    }

    try {
      const user = this.jwtService.verify(accessToken, {
        secret: process.env.ACCESS_JWT_SECRET,
      });

      if (!user) {
        throw new ForbiddenException('Invalid token');
      }

      const hasRole = roles.includes(user.payload.role);
      if (!hasRole) {
        throw new ForbiddenException('User does not have the required role');
      }

      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
