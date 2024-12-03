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
exports.MissionEntity = void 0;
const entity_1 = require("../../common/entity");
const typeorm_1 = require("typeorm");
const complete_entity_1 = require("./complete.entity");
let MissionEntity = class MissionEntity extends entity_1.BaseEntity {
};
exports.MissionEntity = MissionEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MissionEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MissionEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MissionEntity.prototype, "leaderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MissionEntity.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => complete_entity_1.CompleteEntity, complete => complete.mission, { cascade: true }),
    __metadata("design:type", Array)
], MissionEntity.prototype, "complete", void 0);
exports.MissionEntity = MissionEntity = __decorate([
    (0, typeorm_1.Entity)('Mission')
], MissionEntity);
//# sourceMappingURL=mission.entity.js.map