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
exports.MemberRepository = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const group_repository_1 = require("./group.repository");
let MemberRepository = class MemberRepository extends typeorm_2.Repository {
    constructor(repo, entityManager, groupRepository) {
        super(repo.target, repo.manager, repo.queryRunner);
        this.repo = repo;
        this.entityManager = entityManager;
        this.groupRepository = groupRepository;
    }
    async createMember(groupId, userId, nickname) {
        const member = new entities_1.MemberEntity();
        const group = await this.groupRepository.findGroupById(groupId);
        member.groupId = groupId;
        member.userId = userId;
        member.group = group;
        member.nickname = nickname;
        return await this.save(member);
    }
    async findMembers(groupId) {
        const members = await this.findBy({ groupId });
        return members;
    }
    async deleteMember(groupId, userId) {
        const member = await this.findOneBy({ groupId, userId });
        const isDeleted = await this.softRemove({ id: member.id });
        if (!isDeleted) {
            throw new common_1.BadRequestException();
        }
        return true;
    }
};
exports.MemberRepository = MemberRepository;
exports.MemberRepository = MemberRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.MemberEntity)),
    __param(1, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager,
        group_repository_1.GroupRepository])
], MemberRepository);
//# sourceMappingURL=member.reopsitory.js.map