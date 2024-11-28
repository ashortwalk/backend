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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../repositories");
const redis_1 = require("src/common/redis");
let CommentsService = class CommentsService {
    constructor(commentRepository, redisModule) {
        this.commentRepository = commentRepository;
        this.redisModule = redisModule;
    }
    async createComment(postId, userId, nickname, content) {
        const isOnRelay = await this.redisModule.getValue(`OnRelay_${userId}`);
        console.log(isOnRelay);
        if (!isOnRelay) {
            const adminId = process.env.ADMIN_USER_ID;
            await this.redisModule.setValue(`OnRelay_${userId}`, 'true', 604800000);
            await this.commentRepository.createComment(postId, adminId, `👟  ${nickname} 님이 다음 산책에 당첨되셨습니다! 짧은산책 후기를 부탁드려요!`);
        }
        return await this.commentRepository.createComment(postId, userId, content);
    }
    findComments(postId) {
        return this.commentRepository.findComments(postId);
    }
    adminFindComment(commentId) {
        return this.commentRepository.adminFindCommentById(commentId);
    }
    async updateComment(postId, commentId, userId, content) {
        const prevComment = await this.commentRepository.findCommentById(postId, commentId);
        if (prevComment.userId !== userId) {
            throw new common_1.BadRequestException();
        }
        const comment = await this.commentRepository.updateComment(postId, commentId, userId, content);
        return comment;
    }
    async deleteComment(postId, commentId, userId, role) {
        const prevComment = await this.commentRepository.findCommentById(postId, commentId);
        if (role !== 'admin') {
            if (prevComment.userId !== userId) {
                throw new common_1.BadRequestException();
            }
        }
        const comment = await this.commentRepository.deleteComment(commentId);
        return comment;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.CommentsRepository,
        redis_1.RedisModule])
], CommentsService);
//# sourceMappingURL=comments.service.js.map