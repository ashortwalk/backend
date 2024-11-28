import { UserEntity } from '../entities';
import { RedisModule } from 'src/common/redis';
export declare class AccessTokenRepository {
    private readonly redisModule;
    constructor(redisModule: RedisModule);
    saveAccessToken(user: UserEntity, token: string, expiresIn: number): Promise<{
        accessToken: string;
    }>;
}
