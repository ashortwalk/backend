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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const posts_repository_1 = require("../repositories/posts.repository");
const azure_blob_service_1 = require("./azure-blob.service");
const resize_service_1 = require("./resize.service");
let PostService = class PostService {
    constructor(postRepository, resizeImagePipe, azureBlobService) {
        this.postRepository = postRepository;
        this.resizeImagePipe = resizeImagePipe;
        this.azureBlobService = azureBlobService;
    }
    async createPost(userId, nickname, file, createPostDto) {
        let imgURL = null;
        let thumbnail = null;
        let thumbnailURL = null;
        if (file) {
            imgURL = await this.azureBlobService.upload(file, 'images');
            thumbnail = await this.resizeImagePipe.transform(file);
            thumbnailURL = await this.azureBlobService.upload(thumbnail, 'thumbnails');
        }
        return this.postRepository.createPost(userId, nickname, imgURL, thumbnailURL, createPostDto);
    }
    async findPost(postId) {
        const post = await this.postRepository.findPostById(postId);
        return post;
    }
    async findPosts(page) {
        const posts = await this.postRepository.findPosts(page);
        return posts;
    }
    async updatePost(userId, postId, updatePostDto, file) {
        const post = await this.postRepository.findPostById(postId);
        if (post.userId !== userId) {
            throw new common_1.BadRequestException();
        }
        let imgURL;
        let thumbnailURL;
        if (file) {
            imgURL = await this.azureBlobService.upload(file, 'images');
            const thumbnail = await this.resizeImagePipe.transform(file);
            thumbnailURL = await this.azureBlobService.upload(thumbnail, 'thumbnails');
            await this.azureBlobService.deleteFile(post.image, 'images');
            await this.azureBlobService.deleteFile(post.thumbnail, 'thumbnails');
        }
        return await this.postRepository.updatePostById(postId, updatePostDto, imgURL, thumbnailURL);
    }
    async deletePost(userId, role, id) {
        const post = await this.postRepository.findPostById(id);
        if (role !== 'admin') {
            if (post.userId !== userId) {
                throw new common_1.BadRequestException();
            }
        }
        return await this.postRepository.deletePostById(id);
    }
    async statisticsByCategory(userId) {
        return await this.postRepository.statisticsByCategory(userId);
    }
    async countTotalPages() {
        const result = Math.ceil((await this.postRepository.countTotalPosts()) / 6);
        return result;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [posts_repository_1.PostRepository,
        resize_service_1.ResizeImagePipe,
        azure_blob_service_1.AzureBlobService])
], PostService);
//# sourceMappingURL=posts.service.js.map