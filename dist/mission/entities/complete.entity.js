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
exports.CompleteEntity = void 0;
const entity_1 = require("../../common/entity");
const typeorm_1 = require("typeorm");
const mission_entity_1 = require("./mission.entity");
let CompleteEntity = class CompleteEntity extends entity_1.BaseEntity {
};
exports.CompleteEntity = CompleteEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], CompleteEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], CompleteEntity.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mission_entity_1.MissionEntity, mission => mission.complete, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", mission_entity_1.MissionEntity)
], CompleteEntity.prototype, "mission", void 0);
exports.CompleteEntity = CompleteEntity = __decorate([
    (0, typeorm_1.Entity)('Complete')
], CompleteEntity);
//# sourceMappingURL=complete.entity.js.map