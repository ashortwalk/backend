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
exports.AccessTokenRepository = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("src/common/redis");
let AccessTokenRepository = class AccessTokenRepository {
    constructor(redisModule) {
        this.redisModule = redisModule;
    }
    async saveAccessToken(user, token, expiresIn) {
        await this.redisModule.setValue(`accessToken_${user.id}`, `${token}`, expiresIn);
        return { accessToken: token };
    }
};
exports.AccessTokenRepository = AccessTokenRepository;
exports.AccessTokenRepository = AccessTokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_1.RedisModule])
], AccessTokenRepository);
//# sourceMappingURL=access-token.repository.js.map