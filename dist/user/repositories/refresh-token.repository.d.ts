import { UserEntity } from '../entities';
import { RedisModule } from 'src/common/redis';
export declare class RefreshTokenRepository {
    private readonly redisModule;
    constructor(redisModule: RedisModule);
    saveRefreshToken(user: UserEntity, token: string, expiresIn: number): Promise<{
        accessToken: string;
    }>;
}
