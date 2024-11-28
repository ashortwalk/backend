import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities';
import { AccessTokenRepository, UserRepository } from '../repositories';
import { RefreshTokenRepository } from '../repositories';
import { UserService } from './user.service';
import { LoginDto } from '../dto/login.dto';
import { TokenPayload } from '../types/user.type';
export declare class AuthService {
    private readonly jwtService;
    private readonly accessTokenRepository;
    private readonly refreshTokenRepository;
    private readonly userService;
    private readonly userRepository;
    constructor(jwtService: JwtService, accessTokenRepository: AccessTokenRepository, refreshTokenRepository: RefreshTokenRepository, userService: UserService, userRepository: UserRepository);
    kakaoLogin(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    createAccessToken(payload: TokenPayload, user: UserEntity): Promise<string>;
    createRefreshToken(payload: TokenPayload, user: UserEntity): Promise<string>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    kakaoKey(): Promise<{
        kakaoJSKey: string;
        kakaoRedirectURI: string;
    }>;
    googleKey(): Promise<{
        googleClientId: string;
        googleRedirectURI: string;
    }>;
}
