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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const create_post_dto_1 = require("../dto/create-post.dto");
const posts_service_1 = require("../services/posts.service");
const passport_1 = require("@nestjs/passport");
const update_post_dto_1 = require("../dto/update-post.dto");
let PostsController = class PostsController {
    constructor(postService) {
        this.postService = postService;
    }
    async countTotalPages() {
        const count = await this.postService.countTotalPages();
        return { count };
    }
    async createPost(req, file, createPostDto) {
        const userId = req.user.id;
        const nickname = req.user.nickname;
        return await this.postService.createPost(userId, nickname, file, createPostDto);
    }
    getPost(param) {
        const { postId } = param;
        if (!postId) {
            throw new common_1.BadRequestException();
        }
        return this.postService.findPost(postId);
    }
    getPosts(query) {
        let { page } = query;
        if (!page) {
            page = 1;
        }
        return this.postService.findPosts(page);
    }
    async updatePost(req, param, updatePostDto, file) {
        const userId = req.user.id;
        const { postId } = param;
        if (!postId) {
            throw new common_1.BadRequestException();
        }
        return await this.postService.updatePost(userId, postId, updatePostDto, file);
    }
    deletePost(req, param) {
        const userId = req.user.id;
        const role = req.user.role;
        const id = param.postId;
        return this.postService.deletePost(userId, role, id);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "countTotalPages", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(':postId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Patch)(':postId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)(':postId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "deletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('api/posts'),
    __metadata("design:paramtypes", [posts_service_1.PostService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map