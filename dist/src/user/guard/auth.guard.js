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
exports.Roles = exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const common_2 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthGuard = class AuthGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            throw new common_1.ForbiddenException('No roles provided');
        }
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers.authorization;
        if (!authorizationHeader) {
            throw new common_1.ForbiddenException('Authorization header missing');
        }
        const [bearer, accessToken] = authorizationHeader.split(' ');
        if (bearer !== 'Bearer' || !accessToken) {
            throw new common_1.ForbiddenException('Invalid token format');
        }
        try {
            const user = this.jwtService.verify(accessToken, {
                secret: process.env.ACCESS_JWT_SECRET,
            });
            if (!user) {
                throw new common_1.ForbiddenException('Invalid token');
            }
            const hasRole = roles.includes(user.payload.role);
            if (!hasRole) {
                throw new common_1.ForbiddenException('User does not have the required role');
            }
            return true;
        }
        catch (error) {
            console.log(error);
            throw new common_1.ForbiddenException('Invalid or expired token');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService])
], AuthGuard);
const Roles = (...roles) => (0, common_2.SetMetadata)('roles', roles);
exports.Roles = Roles;
//# sourceMappingURL=auth.guard.js.map