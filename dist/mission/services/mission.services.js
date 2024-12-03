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
exports.MissionService = void 0;
const common_1 = require("@nestjs/common");
const mission_repositories_1 = require("../repositories/mission.repositories");
const repositories_1 = require("../../group/repositories");
let MissionService = class MissionService {
    constructor(missionRepository, groupRepository) {
        this.missionRepository = missionRepository;
        this.groupRepository = groupRepository;
    }
    async createMission(title, content, userId, groupId) {
        const group = await this.groupRepository.findGroupById(groupId);
        if (group.leaderUserId !== userId) {
            throw new common_1.UnauthorizedException();
        }
        const result = await this.missionRepository.createMission(title, content, userId, groupId);
        return result;
    }
};
exports.MissionService = MissionService;
exports.MissionService = MissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mission_repositories_1.MissionRepository, repositories_1.GroupRepository])
], MissionService);
//# sourceMappingURL=mission.services.js.map