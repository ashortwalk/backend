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
exports.FeedController = void 0;
const common_1 = require("@nestjs/common");
const feed_services_1 = require("../services/feed.services");
const passport_1 = require("@nestjs/passport");
let FeedController = class FeedController {
    constructor(feedService) {
        this.feedService = feedService;
    }
    async feedGroup(param, body, req) {
        const content = body.content;
        const userId = req.user.id;
        const { groupId } = param;
        return await this.feedService.createFeed(content, userId, groupId);
    }
    async updateGroup(req, param, body) {
        const { feedId } = param;
        const { content } = body;
        if (!feedId) {
            throw new common_1.BadRequestException();
        }
        return await this.feedService.updateFeed(content, feedId);
    }
    async deleteUser(req, param) {
        const { feedId } = param;
        const userId = req.user.id;
        const role = req.user.role;
        return await this.feedService.deleteFeed(userId, role, feedId);
    }
    getFeeds(query) {
        let { page } = query;
        if (!page) {
            page = 1;
        }
        return this.feedService.findFeeds(page);
    }
    countFeeds(param) {
        const { groupId } = param;
        return this.feedService.countFeeds(groupId);
    }
};
exports.FeedController = FeedController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "feedGroup", null);
__decorate([
    (0, common_1.Patch)(':feedId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "updateGroup", null);
__decorate([
    (0, common_1.Delete)(':feedId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "getFeeds", null);
__decorate([
    (0, common_1.Get)('/count'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "countFeeds", null);
exports.FeedController = FeedController = __decorate([
    (0, common_1.Controller)('api/groups/:groupId/feeds'),
    __metadata("design:paramtypes", [feed_services_1.FeedService])
], FeedController);
//# sourceMappingURL=feed.controllers.js.map