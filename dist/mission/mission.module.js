"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("../user/user.module");
const group_module_1 = require("../group/group.module");
const mission_entity_1 = require("./entities/mission.entity");
const mission_controllers_1 = require("./controllers/mission.controllers");
const mission_services_1 = require("./services/mission.services");
const mission_repositories_1 = require("./repositories/mission.repositories");
dotenv.config();
let MissionModule = class MissionModule {
};
exports.MissionModule = MissionModule;
exports.MissionModule = MissionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            group_module_1.GroupModule,
            typeorm_1.TypeOrmModule.forFeature([mission_entity_1.MissionEntity]),
            user_module_1.AuthModule,
            jwt_1.JwtModule.register({ secret: process.env.JWT_SECRET }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [mission_controllers_1.MissionController],
        providers: [mission_services_1.MissionService, mission_repositories_1.MissionRepository],
        exports: [],
    })
], MissionModule);
//# sourceMappingURL=mission.module.js.map