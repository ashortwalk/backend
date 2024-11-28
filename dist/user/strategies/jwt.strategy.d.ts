import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../types/user.type';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    validate(payload: {
        payload: TokenPayload;
    }): Promise<{
        id: string;
        role: string;
        nickname: string;
    }>;
}
export {};
