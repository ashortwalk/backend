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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
const passport_1 = require("@nestjs/passport");
const dto_1 = require("../dto");
const login_dto_1 = require("../dto/login.dto");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    loginChecker() {
        return true;
    }
    async kakaoCallback(req, res) {
        const result = await this.authService.kakaoLogin(req);
        return res.redirect(`http://127.0.0.1:3000/posts?refreshtoken=${result.refreshToken}&accesstoken=${result.accessToken}`);
    }
    async kakaoKey() {
        return await this.authService.kakaoKey();
    }
    async email(body) {
        return await this.userService.sendEmail(body.email);
    }
    async verify(body) {
        return await this.userService.verifyEmail(body.email, body.number);
    }
    async signup(createUserDto) {
        const { email, nickname, password } = createUserDto;
        return await this.userService.createUser(email, nickname, password, 'email');
    }
    async login(loginDto) {
        return await this.authService.login(loginDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('check'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Boolean)
], AuthController.prototype, "loginChecker", null);
__decorate([
    (0, common_1.Get)('login/kakao'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoCallback", null);
__decorate([
    (0, common_1.Post)('kakaokey'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoKey", null);
__decorate([
    (0, common_1.Post)('email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "email", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [services_1.AuthService,
        services_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map