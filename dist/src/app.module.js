"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const dotenv = require("dotenv");
const post_module_1 = require("./posts/post.module");
const redis_1 = require("./common/redis");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./user/strategies/jwt.strategy");
const jwt_1 = require("@nestjs/jwt");
const key_controller_1 = require("./key/key.controller");
const comments_module_1 = require("./comments/comments.module");
const group_module_1 = require("./group/group.module");
const feed_module_1 = require("./feeds/feed.module");
const health_controller_1 = require("./health.controller");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            typeorm_1.TypeOrmModule.forRoot({
                name: 'default',
                type: 'postgres',
                host: process.env.DB_HOST,
                port: 5432,
                username: process.env.DB_USER,
                password: process.env.DB_PW,
                database: process.env.DB_NAME,
                entities: ['dist/**/**.entity.{js,ts}'],
                synchronize: true,
            }),
            user_module_1.AuthModule,
            post_module_1.PostsModule,
            comments_module_1.CommentModule,
            group_module_1.GroupModule,
            feed_module_1.FeedModule,
        ],
        controllers: [key_controller_1.KeyController, health_controller_1.HealthController],
        providers: [jwt_strategy_1.JwtStrategy, redis_1.RedisModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map