"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const repositories_1 = require("../repositories");
const repositories_2 = require("../repositories");
const user_service_1 = require("./user.service");
let AuthService = class AuthService {
    constructor(jwtService, accessTokenRepository, refreshTokenRepository, userService, userRepository) {
        this.jwtService = jwtService;
        this.accessTokenRepository = accessTokenRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }
    async kakaoLogin(req) {
        const password = req.user.password;
        const existingUser = await this.userService.findByKakaoPassword(password);
        const role = req.user.role;
        const nickname = req.user.nickname;
        if (existingUser) {
            const accessToken = await this.createAccessToken({
                id: existingUser.id,
                role: existingUser.role,
                nickname: existingUser.nickname,
            }, existingUser);
            const refreshToken = await this.createRefreshToken({
                id: existingUser.id,
                role: existingUser.role,
                nickname: existingUser.nickname,
            }, existingUser);
            return { accessToken, refreshToken };
        }
        const user = await this.userService.createUser(null, nickname, password, role);
        return user;
    }
    async createAccessToken(payload, user) {
        const expiresIn = process.env.ACCESS_EXPIRES_IN;
        const token = 'Bearer ' + this.jwtService.sign({ payload }, { expiresIn });
        await this.accessTokenRepository.saveAccessToken(user, token, Number(expiresIn));
        return token;
    }
    async createRefreshToken(payload, user) {
        const expiresIn = process.env.ACCESS_EXPIRES_IN;
        const token = 'Bearer ' + this.jwtService.sign({ payload }, { expiresIn });
        await this.refreshTokenRepository.saveRefreshToken(user, token, Number(expiresIn));
        return token;
    }
    async login(loginDto) {
        const user = await this.userRepository.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.BadRequestException();
        }
        const result = await this.userService.comparePasswords(user.password, loginDto.password);
        if (!result) {
            throw new common_1.BadRequestException();
        }
        const accessToken = await this.createAccessToken({ id: user.id, role: user.role, nickname: user.nickname }, user);
        const refreshToken = await this.createRefreshToken({ id: user.id, role: user.role, nickname: user.nickname }, user);
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
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "kakaoLogin", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        repositories_1.AccessTokenRepository,
        repositories_2.RefreshTokenRepository,
        user_service_1.UserService,
        repositories_1.UserRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map