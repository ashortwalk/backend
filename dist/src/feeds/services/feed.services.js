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
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const feed_repositories_1 = require("../repositories/feed.repositories");
let FeedService = class FeedService {
    constructor(feedRepository) {
        this.feedRepository = feedRepository;
    }
    async createFeed(content, userId, groupId) {
        const result = await this.feedRepository.createFeed(content, userId, groupId);
        return result;
    }
    async findFeed(feedId) {
        const Feed = await this.feedRepository.findFeedById(feedId);
        return Feed;
    }
    async updateFeed(content, feedId) {
        return await this.feedRepository.updateFeed(content, feedId);
    }
    async deleteFeed(userId, role, feedId) {
        const Feed = await this.feedRepository.findFeedById(feedId);
        if (role !== 'admin') {
            if (userId !== Feed.userId) {
                throw new common_1.BadRequestException();
            }
        }
        return await this.feedRepository.deleteFeed(feedId);
    }
    async findFeeds(page) {
        const Feeds = await this.feedRepository.findFeeds(page);
        return Feeds;
    }
    async countFeeds(groupId) {
        return Math.ceil((await this.feedRepository.countFeeds(groupId)) / 3);
    }
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [feed_repositories_1.FeedRepository])
], FeedService);
//# sourceMappingURL=feed.services.js.map