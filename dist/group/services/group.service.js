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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../repositories");
const member_reopsitory_1 = require("../repositories/member.reopsitory");
let GroupService = class GroupService {
    constructor(groupRepository, memberRepository) {
        this.groupRepository = groupRepository;
        this.memberRepository = memberRepository;
    }
    async createGroup(groupName, description, tag, leaderUserId, leaderNickname) {
        const result = await this.groupRepository.createGroup(groupName, description, tag, leaderUserId, leaderNickname);
        await this.memberRepository.createMember(result.id, leaderUserId, leaderNickname);
        return result;
    }
    async findGroup(id) {
        const group = await this.groupRepository.findGroupById(id);
        return group;
    }
    async updateGroup(id, groupName, description, tag) {
        return await this.groupRepository.updateGroup(id, groupName, description, tag);
    }
    async deleteGroup(userId, role, id) {
        const group = await this.groupRepository.findGroupById(id);
        if (role !== 'admin') {
            if (userId !== group.leaderUserId) {
                throw new common_1.BadRequestException();
            }
        }
        return await this.groupRepository.deleteGroup(id);
    }
    async findGroups(page) {
        const groups = await this.groupRepository.findGroups(page);
        return groups;
    }
    async countTotalPages() {
        const count = await this.groupRepository.countTotalGroups();
        return Math.ceil(count / 3);
    }
    async myGroups(userId) {
        const groups = await this.groupRepository.myGroups(userId);
        return groups;
    }
    async deleteGroupByName(groupName) {
        return await this.groupRepository.deleteGroupByName(groupName);
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.GroupRepository,
        member_reopsitory_1.MemberRepository])
], GroupService);
//# sourceMappingURL=group.service.js.map