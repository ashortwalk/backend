import { Injectable } from '@nestjs/common';
import { RedisModule } from 'src/common/redis';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly redisModule: RedisModule) {}

  async saveRefreshToken(
    userId: string,
    token: string,
    expiresIn: number,
  ): Promise<{ accessToken: string }> {
    await this.redisModule.setValue(
      `refreshToken_${userId}`,
      `${token}`,
      expiresIn,
    );
    return { accessToken: token };
  }
}
