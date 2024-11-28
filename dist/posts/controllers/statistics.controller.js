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
exports.StatisticsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("../services/posts.service");
const passport_1 = require("@nestjs/passport");
const auth_guard_1 = require("../../user/guard/auth.guard");
let StatisticsController = class StatisticsController {
    constructor(postService) {
        this.postService = postService;
    }
    async statistics(req) {
        const userId = req.user.id;
        return await this.postService.statisticsByCategory(userId);
    }
};
exports.StatisticsController = StatisticsController;
__decorate([
    (0, common_1.Get)('category'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, auth_guard_1.Roles)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "statistics", null);
exports.StatisticsController = StatisticsController = __decorate([
    (0, common_1.Controller)('api/statistics'),
    __metadata("design:paramtypes", [posts_service_1.PostService])
], StatisticsController);
//# sourceMappingURL=statistics.controller.js.map