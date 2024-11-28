"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const common_1 = require("@nestjs/common");
const controllers_1 = require("./controllers");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
const passport_1 = require("@nestjs/passport");
const entities_1 = require("./entities");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("src/user/user.module");
const services_1 = require("./services");
const repositories_1 = require("./repositories");
const member_controller_1 = require("./controllers/member.controller");
const member_service_1 = require("./services/member.service");
const member_reopsitory_1 = require("./repositories/member.reopsitory");
dotenv.config();
let GroupModule = class GroupModule {
};
exports.GroupModule = GroupModule;
exports.GroupModule = GroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.GroupEntity, entities_1.MemberEntity]),
            user_module_1.AuthModule,
            jwt_1.JwtModule.register({ secret: process.env.JWT_SECRET }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [controllers_1.GrpupController, member_controller_1.MemberController],
        providers: [services_1.GroupService, repositories_1.GroupRepository, member_service_1.MemberService, member_reopsitory_1.MemberRepository],
        exports: [repositories_1.GroupRepository],
    })
], GroupModule);
//# sourceMappingURL=group.module.js.map