import { AccessTokenRepository, RefreshTokenRepository, UserRepository } from '../repositories';
import { UserType } from '../types/user.type';
import { RedisModule } from 'src/common/redis';
import { UserEntity } from '../entities';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../types/user.type';
export declare class UserService {
    private readonly refreshTokenRepository;
    private readonly accessTokenRepository;
    private readonly jwtService;
    private readonly userRepository;
    private readonly redisModule;
    constructor(refreshTokenRepository: RefreshTokenRepository, accessTokenRepository: AccessTokenRepository, jwtService: JwtService, userRepository: UserRepository, redisModule: RedisModule);
    findUser(id: string): Promise<UserEntity>;
    findByKakaoPassword(password: string): Promise<UserEntity>;
    sendEmail(email: string): Promise<void>;
    verifyEmail(email: string, number: number): Promise<void>;
    createUser(email: string, nickname: string, password: string, type: UserType): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    hashPassword(password: string): Promise<string>;
    comparePasswords(hashedPassword: string, plainPassword: string): Promise<boolean>;
    createAccessToken(payload: TokenPayload, user: UserEntity): Promise<string>;
    createRefreshToken(payload: TokenPayload, user: UserEntity): Promise<string>;
    updateUser(id: string, nickname: string): Promise<UserEntity>;
    deleteUser(id: string): Promise<boolean>;
}
