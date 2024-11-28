"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("src/user/user.module");
const feed_entity_1 = require("./entities/feed.entity");
const group_module_1 = require("src/group/group.module");
const feed_controllers_1 = require("./controllers/feed.controllers");
const feed_services_1 = require("./services/feed.services");
const feed_repositories_1 = require("./repositories/feed.repositories");
dotenv.config();
let FeedModule = class FeedModule {
};
exports.FeedModule = FeedModule;
exports.FeedModule = FeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            group_module_1.GroupModule,
            typeorm_1.TypeOrmModule.forFeature([feed_entity_1.FeedEntity]),
            user_module_1.AuthModule,
            jwt_1.JwtModule.register({ secret: process.env.JWT_SECRET }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [feed_controllers_1.FeedController],
        providers: [feed_services_1.FeedService, feed_repositories_1.FeedRepository],
        exports: [],
    })
], FeedModule);
//# sourceMappingURL=feed.module.js.map