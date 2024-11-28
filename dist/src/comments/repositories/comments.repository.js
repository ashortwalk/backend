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
exports.CommentsRepository = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const repositories_1 = require("src/user/repositories");
const posts_repository_1 = require("src/posts/repositories/posts.repository");
let CommentsRepository = class CommentsRepository extends typeorm_1.Repository {
    constructor(repo, entityManager, userRepository, postRepository) {
        super(repo.target, repo.manager, repo.queryRunner);
        this.repo = repo;
        this.entityManager = entityManager;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }
    async createComment(postId, userId, content) {
        const user = await this.userRepository.findUserById(userId);
        const post = await this.postRepository.findPostById(postId);
        const comment = new entities_1.CommentEntity();
        comment.user = user;
        comment.post = post;
        comment.nickname = user.nickname;
        comment.content = content;
        comment.userId = userId;
        comment.postId = post.id;
        return await this.save(comment);
    }
    async findComments(postId) {
        return await this.find({
            where: { postId },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findCommentById(postId, commentId) {
        return await this.findOneBy({ id: commentId, postId });
    }
    async adminFindCommentById(commentId) {
        return await this.findOneBy({ id: commentId });
    }
    async updateComment(postId, commentId, userId, content) {
        const comment = await this.findOneBy({ id: commentId, postId });
        comment.content = content;
        return await this.save(comment);
    }
    async deleteComment(commentId) {
        this.softRemove({ id: commentId });
        return true;
    }
};
exports.CommentsRepository = CommentsRepository;
exports.CommentsRepository = CommentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.CommentEntity)),
    __param(1, (0, typeorm_2.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.EntityManager,
        repositories_1.UserRepository,
        posts_repository_1.PostRepository])
], CommentsRepository);
//# sourceMappingURL=comments.repository.js.map