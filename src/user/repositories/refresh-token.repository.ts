import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '../entities';
import { RedisModule } from 'src/common/redis';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly redisModule: RedisModule,
  ) {}

  async saveRefreshToken(
    user: User,
    token: string,
    expiresIn: number,
  ): Promise<{ accessToken: string }> {
    await this.redisModule.setValue(
      `refreshToken_${user.id}`,
      `${token}`,
      expiresIn,
    );
    return { accessToken: token };
  }
}
