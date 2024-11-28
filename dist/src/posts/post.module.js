"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const controllers_1 = require("./controllers");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
const passport_1 = require("@nestjs/passport");
const entities_1 = require("./entities");
const typeorm_1 = require("@nestjs/typeorm");
const posts_service_1 = require("./services/posts.service");
const azure_blob_service_1 = require("./services/azure-blob.service");
const posts_repository_1 = require("./repositories/posts.repository");
const user_module_1 = require("src/user/user.module");
const resize_service_1 = require("./services/resize.service");
const statistics_controller_1 = require("./controllers/statistics.controller");
dotenv.config();
let PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule;
exports.PostsModule = PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.PostEntity]),
            user_module_1.AuthModule,
            jwt_1.JwtModule.register({ secret: process.env.JWT_SECRET }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [controllers_1.PostsController, statistics_controller_1.StatisticsController],
        providers: [posts_service_1.PostService, posts_repository_1.PostRepository, azure_blob_service_1.AzureBlobService, resize_service_1.ResizeImagePipe],
        exports: [posts_repository_1.PostRepository],
    })
], PostsModule);
//# sourceMappingURL=post.module.js.map