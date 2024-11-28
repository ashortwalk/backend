import { AuthService, UserService } from '../services';
import { CreateUserDto } from '../dto';
import { LoginDto } from '../dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    loginChecker(): boolean;
    kakaoCallback(req: any, res: any): Promise<any>;
    kakaoKey(): Promise<{
        kakaoJSKey: string;
        kakaoRedirectURI: string;
    }>;
    email(body: any): Promise<void>;
    verify(body: any): Promise<void>;
    signup(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
