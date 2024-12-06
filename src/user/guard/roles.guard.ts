import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../types/user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true; // 역할이 설정되지 않으면 기본적으로 접근 허용
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // 로그인된 사용자 정보가 request 객체에 담겨 있다고 가정

    return user && roles.some(role => user.roles?.includes(role)); // 사용자 역할 확인
  }
}
