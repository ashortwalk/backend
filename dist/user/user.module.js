"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const strategies_1 = require("./strategies");
const controllers_1 = require("./controllers");
const services_1 = require("./services");
const repositories_1 = require("./repositories");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const common_2 = require("../common");
const redis_1 = require("../common/redis");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
const user_controller_1 = require("./controllers/user.controller");
const passport_1 = require("@nestjs/passport");
const reports_repository_1 = require("./repositories/reports.repository");
const reports_service_1 = require("./services/reports.service");
const report_controller_1 = require("./controllers/report.controller");
const axios_1 = require("@nestjs/axios");
dotenv.config();
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.UserEntity, entities_1.ReportEntity]),
            jwt_1.JwtModule.register({ secret: process.env.JWT_SECRET }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            axios_1.HttpModule,
        ],
        controllers: [controllers_1.AuthController, user_controller_1.UserController, report_controller_1.ReportController],
        providers: [
            common_2.Gmail,
            repositories_1.AccessTokenRepository,
            repositories_1.RefreshTokenRepository,
            strategies_1.KakaoStrategy,
            services_1.UserService,
            services_1.AuthService,
            redis_1.RedisModule,
            repositories_1.UserRepository,
            reports_service_1.ReportService,
            reports_repository_1.ReportRepository,
        ],
        exports: [repositories_1.UserRepository],
    })
], AuthModule);
//# sourceMappingURL=user.module.js.map