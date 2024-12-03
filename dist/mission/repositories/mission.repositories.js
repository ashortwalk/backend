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
exports.MissionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mission_entity_1 = require("../entities/mission.entity");
let MissionRepository = class MissionRepository extends typeorm_2.Repository {
    constructor(repo, entityManager) {
        super(repo.target, repo.manager, repo.queryRunner);
        this.repo = repo;
        this.entityManager = entityManager;
    }
    async createMission(title, content, userId, groupId) {
        const Mission = new mission_entity_1.MissionEntity();
        Mission.content = content;
        Mission.leaderId = userId;
        Mission.groupId = groupId;
        Mission.title = title;
        return await this.save(Mission);
    }
};
exports.MissionRepository = MissionRepository;
exports.MissionRepository = MissionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mission_entity_1.MissionEntity)),
    __param(1, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], MissionRepository);
//# sourceMappingURL=mission.repositories.js.map