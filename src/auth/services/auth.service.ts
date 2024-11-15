import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities';
import { AccessTokenRepository, UserRepository } from '../repositories';
import { RefreshTokenRepository } from '../repositories';
import { UserService } from './user.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  async kakaoLogin(@Req() req) {
    const user = await this.userService.findByKakaoPassword(req.user.password);

    if (!user) {
      await this.userService.createUser(
        null,
        req.user.nickname,
        req.user.password,
        'kakao',
      );
    }
    const existingUser = await this.userRepository.findByKakaoPassword(
      req.user.password,
    );
    const accessToken = await this.createAccessToken(
      { id: existingUser.id, role: user.role },
      existingUser,
    );
    const refreshToken = await this.createRefreshToken(
      { id: existingUser.id, role: user.role },
      existingUser,
    );
    return { accessToken, refreshToken };
  }

  async createAccessToken(
    payload: { id: string; role: string },
    user: User,
  ): Promise<string> {
    const expiresIn = process.env.ACCESS_EXPIRES_IN;
    const token = 'Bearer ' + this.jwtService.sign({ payload }, { expiresIn });

    await this.accessTokenRepository.saveAccessToken(
      user,
      token,
      Number(expiresIn),
    );
    return token;
  }

  async createRefreshToken(
    payload: { id: string; role: string },
    user: User,
  ): Promise<string> {
    const expiresIn = process.env.ACCESS_EXPIRES_IN;
    const token = 'Bearer ' + this.jwtService.sign({ payload }, { expiresIn });

    await this.refreshTokenRepository.saveRefreshToken(
      user,
      token,
      Number(expiresIn),
    );
    return token;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException();
    }
    const result = await this.userService.comparePasswords(
      user.password,
      loginDto.password,
    );
    if (!result) {
      throw new BadRequestException();
    }
    const accessToken = await this.createAccessToken(
      { id: user.id, role: user.role },
      user,
    );
    const refreshToken = await this.createRefreshToken(
      { id: user.id, role: user.role },
      user,
    );
    return { accessToken, refreshToken };
  }

  async kakaoKey() {
    return {
      kakaoJSKey: process.env.KAKAO_CLIENT_ID,
      kakaoRedirectURI: process.env.KAKAO_CALLBACK_URL,
    };
  }
  async googleKey() {
    return {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleRedirectURI: process.env.GOOGLE_CALLBACK_URL,
    };
  }
}
