import { Profile, Strategy } from 'passport-kakao';
declare const KakaoStrategy_base: new (...args: any[]) => Strategy;
export declare class KakaoStrategy extends KakaoStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<{
        password: string;
        role: string;
        nickname: string;
    }>;
}
export {};
