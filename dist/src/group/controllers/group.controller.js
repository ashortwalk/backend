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
exports.GrpupController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
const dto_1 = require("../dto");
const passport_1 = require("@nestjs/passport");
const dto_2 = require("../dto");
const auth_guard_1 = require("src/user/guard/auth.guard");
let GrpupController = class GrpupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async countTotalPages() {
        return await this.groupService.countTotalPages();
    }
    async myGroups(req) {
        const userId = req.user.id;
        return await this.groupService.myGroups(userId);
    }
    async createGroup(createGroupDto, req) {
        const leaderUserId = req.user.id;
        const leaderNickname = req.user.nickname;
        const groupName = createGroupDto.groupName;
        const description = createGroupDto.description;
        const tag = createGroupDto.tag;
        return await this.groupService.createGroup(groupName, description, tag, leaderUserId, leaderNickname);
    }
    getPost(param) {
        const { groupId } = param;
        if (!groupId) {
            throw new common_1.BadRequestException();
        }
        return this.groupService.findGroup(groupId);
    }
    async updateGroup(req, param, updateGroupDto) {
        const { id } = param;
        if (!id) {
            throw new common_1.BadRequestException();
        }
        return await this.groupService.updateGroup(id, updateGroupDto.groupName, updateGroupDto.description, updateGroupDto.tag);
    }
    async deleteUser(req, id) {
        const userId = req.user.id;
        const role = req.user.role;
        return await this.groupService.deleteGroup(userId, role, id);
    }
    getGroups(query) {
        let { page } = query;
        if (!page) {
            page = 1;
        }
        return this.groupService.findGroups(page);
    }
    async deleteGroupByName(groupName) {
        return await this.groupService.deleteGroupByName(groupName);
    }
};
exports.GrpupController = GrpupController;
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GrpupController.prototype, "countTotalPages", null);
__decorate([
    (0, common_1.Get)('mygroups'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GrpupController.prototype, "myGroups", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateGroupDto, Object]),
    __metadata("design:returntype", Promise)
], GrpupController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)(':groupId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GrpupController.prototype, "getPost", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, dto_2.UpdateGroupDto]),
    __metadata("design:returntype", Promise)
], GrpupController.prototype, "updateGroup", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GrpupController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GrpupController.prototype, "getGroups", null);
__decorate([
    (0, common_1.Delete)(':groupName'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, auth_guard_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('groupName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GrpupController.prototype, "deleteGroupByName", null);
exports.GrpupController = GrpupController = __decorate([
    (0, common_1.Controller)('api/groups'),
    __metadata("design:paramtypes", [services_1.GroupService])
], GrpupController);
//# sourceMappingURL=group.controller.js.map