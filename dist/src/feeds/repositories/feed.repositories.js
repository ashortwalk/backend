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
exports.FeedRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feed_entity_1 = require("../entities/feed.entity");
const repositories_1 = require("src/group/repositories");
let FeedRepository = class FeedRepository extends typeorm_2.Repository {
    constructor(repo, entityManager, groupRepository) {
        super(repo.target, repo.manager, repo.queryRunner);
        this.repo = repo;
        this.entityManager = entityManager;
        this.groupRepository = groupRepository;
    }
    async createFeed(content, userId, groupId) {
        const Feed = new feed_entity_1.FeedEntity();
        Feed.content = content;
        Feed.userId = userId;
        Feed.groupId = groupId;
        const group = await this.groupRepository.findGroupById(groupId);
        Feed.group = group;
        return await this.save(Feed);
    }
    async findFeedById(FeedId) {
        const Feed = await this.findOneBy({ id: FeedId });
        if (!Feed) {
            throw new common_1.BadRequestException();
        }
        return Feed;
    }
    async updateFeed(content, feedId) {
        const Feed = await this.findOneBy({ id: feedId });
        if (!Feed) {
            throw new common_1.BadRequestException();
        }
        Feed.content = content;
        const updatedFeed = this.save(Feed);
        return updatedFeed;
    }
    async deleteFeed(feedId) {
        const Feed = await this.softRemove({ id: feedId });
        if (!Feed) {
            throw new common_1.BadRequestException();
        }
        return true;
    }
    async findFeeds(page) {
        const limit = 3;
        const Feeds = await this.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC',
            },
        });
        return Feeds;
    }
    async countFeeds(groupId) {
        return await this.count({ where: { groupId } });
    }
};
exports.FeedRepository = FeedRepository;
exports.FeedRepository = FeedRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feed_entity_1.FeedEntity)),
    __param(1, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        repositories_1.GroupRepository])
], FeedRepository);
//# sourceMappingURL=feed.repositories.js.map