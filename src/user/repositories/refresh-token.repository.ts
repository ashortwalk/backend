import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities';
import { RedisModule } from 'src/common/redis';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly redisModule: RedisModule) {}

  async saveRefreshToken(
    user: UserEntity,
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
