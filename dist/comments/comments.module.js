"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const services_1 = require("./services");
const repositories_1 = require("./repositories");
const controllers_1 = require("./controllers");
const user_module_1 = require("../user/user.module");
const post_module_1 = require("../posts/post.module");
const entities_1 = require("./entities");
const redis_1 = require("../common/redis");
const admin_comment_controller_1 = require("./controllers/admin-comment.controller");
dotenv.config();
let CommentModule = class CommentModule {
};
exports.CommentModule = CommentModule;
exports.CommentModule = CommentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            post_module_1.PostsModule,
            user_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([entities_1.CommentEntity]),
            jwt_1.JwtModule.register({ secret: process.env.JWT_SECRET }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [controllers_1.CommentsController, admin_comment_controller_1.AdminCommentController],
        providers: [services_1.CommentsService, repositories_1.CommentsRepository, redis_1.RedisModule],
        exports: [],
    })
], CommentModule);
//# sourceMappingURL=comments.module.js.map