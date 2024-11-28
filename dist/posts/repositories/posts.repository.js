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
exports.PostRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const repositories_1 = require("../../user/repositories");
let PostRepository = class PostRepository extends typeorm_1.Repository {
    constructor(repo, entityManager, userRepository) {
        super(repo.target, repo.manager, repo.queryRunner);
        this.repo = repo;
        this.entityManager = entityManager;
        this.userRepository = userRepository;
    }
    async createPost(userId, nickname, imgURL, thumbnailURL, createPostDto) {
        const user = await this.userRepository.findUserById(userId);
        const post = new entities_1.PostEntity();
        post.user = user;
        post.userId = userId;
        post.nickname = nickname;
        post.title = createPostDto.title;
        post.content = createPostDto.content;
        post.category = createPostDto.category;
        if (imgURL) {
            post.image = imgURL;
            post.thumbnail = thumbnailURL;
        }
        const result = await this.save(post);
        delete result.user.password;
        return result;
    }
    async findPostById(postId) {
        const post = await this.findOneBy({ id: postId });
        if (!post) {
            throw new common_1.BadRequestException();
        }
        post.viewCount = post.viewCount + 1;
        this.save(post);
        return post;
    }
    async findPosts(page) {
        const limit = 6;
        const posts = await this.find({
            select: {
                id: true,
                title: true,
                thumbnail: true,
                createdAt: true,
                nickname: true,
                viewCount: true,
            },
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC',
            },
        });
        return posts;
    }
    async updatePostById(postId, updatePostDto, imgURL, thumbnailURL) {
        const post = await this.findOneBy({ id: postId });
        if (!post) {
            throw new common_1.BadRequestException();
        }
        if (post.title) {
            post.title = updatePostDto.title;
        }
        if (post.content) {
            post.content = updatePostDto.content;
        }
        if (post.category) {
            post.category = updatePostDto.category;
        }
        if (imgURL) {
            post.image = imgURL;
            post.thumbnail = thumbnailURL;
        }
        const updatedPost = this.save(post);
        return updatedPost;
    }
    async deletePostById(postId) {
        await this.softRemove({ id: postId });
        const post = await this.findOneBy({ id: postId });
        if (post) {
            throw new common_1.InternalServerErrorException();
        }
        return true;
    }
    async statisticsByCategory(userId) {
        return await this.createQueryBuilder('post')
            .select('post.category', 'category')
            .addSelect('COUNT(post.id)', 'count')
            .where('post.user.id = :userId', { userId })
            .groupBy('post.category')
            .orderBy('count', 'DESC')
            .limit(5)
            .getRawMany();
    }
    async countTotalPosts() {
        return await this.count();
    }
};
exports.PostRepository = PostRepository;
exports.PostRepository = PostRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.PostEntity)),
    __param(1, (0, typeorm_2.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.EntityManager,
        repositories_1.UserRepository])
], PostRepository);
//# sourceMappingURL=posts.repository.js.map