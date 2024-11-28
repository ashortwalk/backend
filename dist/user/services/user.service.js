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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../repositories");
const argon2 = require("argon2");
const common_2 = require("../../common");
const redis_1 = require("../../common/redis");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(refreshTokenRepository, accessTokenRepository, jwtService, userRepository, redisModule) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.accessTokenRepository = accessTokenRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.redisModule = redisModule;
    }
    async findUser(id) {
        const user = await this.userRepository.findUserById(id);
        delete user.password;
        return user;
    }
    async findByKakaoPassword(password) {
        return this.userRepository.findByKakaoPassword(password);
    }
    async sendEmail(email) {
        const isEmailExist = await this.userRepository.findByEmail(email);
        if (isEmailExist) {
            throw new common_1.ConflictException();
        }
        const verifyNumber = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
        const subject = '[짧은 산책] 인증번호를 확인하세요!';
        const text = `
              짧은 산책 에 찾아 주셔서 감사합니다!
              회원 가입을 위해 이 숫자를 입력해 주세요. 
              [ ${verifyNumber} ]`;
        const gmail = new common_2.Gmail(email, subject, text);
        const isEmail = await gmail.send();
        if (isEmail) {
            await this.redisModule.setValue(`verifyNumber_${email}`, `${verifyNumber}`, 300);
        }
    }
    async verifyEmail(email, number) {
        if (number.toString() !==
            (await this.redisModule.getValue(`verifyNumber_${email}`))) {
            throw new common_1.BadRequestException();
        }
        else {
            await this.redisModule.setValue(`isverified_${email}`, `true`, 300);
        }
    }
    async createUser(email, nickname, password, type) {
        if (type == 'email') {
            if ((await this.redisModule.getValue(`isverified_${email}`)) == 'true') {
                await this.redisModule.deleteValue(`isverified_${email}`);
            }
            else {
                throw new common_1.BadRequestException();
            }
            const isNicknameExist = await this.userRepository.findUserByNickname(nickname);
            if (isNicknameExist) {
                throw new common_1.ConflictException();
            }
            password = await this.hashPassword(password);
        }
        const result = await this.userRepository.createUser(email, nickname, password, type);
        const accessToken = await this.createAccessToken({ id: result.id, role: result.role, nickname: result.nickname }, result);
        const refreshToken = await this.createRefreshToken({ id: result.id, role: result.role, nickname: result.nickname }, result);
        return { accessToken, refreshToken };
    }
    async hashPassword(password) {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    }
    async comparePasswords(hashedPassword, plainPassword) {
        return await argon2.verify(hashedPassword, plainPassword);
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
    async updateUser(id, nickname) {
        return await this.userRepository.updateUser(id, nickname);
    }
    async deleteUser(id) {
        return await this.userRepository.deleteUser(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.RefreshTokenRepository,
        repositories_1.AccessTokenRepository,
        jwt_1.JwtService,
        repositories_1.UserRepository,
        redis_1.RedisModule])
], UserService);
//# sourceMappingURL=user.service.js.map