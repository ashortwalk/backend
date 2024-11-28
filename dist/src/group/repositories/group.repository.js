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
exports.GroupRepository = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let GroupRepository = class GroupRepository extends typeorm_2.Repository {
    constructor(repo, entityManager) {
        super(repo.target, repo.manager, repo.queryRunner);
        this.repo = repo;
        this.entityManager = entityManager;
    }
    async createGroup(groupName, description, tag, leaderUserId, leaderNickname) {
        const group = new entities_1.GroupEntity();
        group.leaderNickname = leaderNickname;
        group.leaderUserId = leaderUserId;
        group.groupName = groupName;
        group.description = description;
        group.tag = tag;
        const result = await this.save(group);
        return result;
    }
    async findGroupById(groupId) {
        const group = await this.findOneBy({ id: groupId });
        if (!group) {
            throw new common_1.BadRequestException();
        }
        return group;
    }
    async updateGroup(id, groupName, description, tag) {
        const group = await this.findOneBy({ id });
        if (!group) {
            throw new common_1.BadRequestException();
        }
        group.groupName = groupName;
        group.description = description;
        group.tag = tag;
        const updatedGroup = this.save(group);
        return updatedGroup;
    }
    async deleteGroup(id) {
        const group = await this.softRemove({ id });
        if (!group) {
            throw new common_1.BadRequestException();
        }
        return true;
    }
    async findGroups(page) {
        const limit = 3;
        const groups = await this.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'DESC',
            },
        });
        return groups;
    }
    async countTotalGroups() {
        return await this.count();
    }
    async myGroups(userId) {
        return await this.createQueryBuilder('groups')
            .innerJoin('groups.member', 'members')
            .where('members.userId = :userId', { userId })
            .select([
            'groups.groupName',
            'groups.description',
            'groups.leaderNickname',
            'groups.leaderUserId',
            'groups.id',
        ])
            .getMany();
    }
    async deleteGroupByName(groupName) {
        const info = await this.findOneBy({ groupName });
        const id = info.id;
        const group = await this.softRemove({ id });
        if (!group) {
            throw new common_1.BadRequestException();
        }
        return true;
    }
};
exports.GroupRepository = GroupRepository;
exports.GroupRepository = GroupRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.GroupEntity)),
    __param(1, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], GroupRepository);
//# sourceMappingURL=group.repository.js.map