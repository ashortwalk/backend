import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ['profile_nickname'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      password: String(profile.id),
      nickname: profile.displayName,
    };
  }
}
