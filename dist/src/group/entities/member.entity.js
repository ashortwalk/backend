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
exports.MemberEntity = void 0;
const typeorm_1 = require("typeorm");
const group_entity_1 = require("./group.entity");
const entity_1 = require("src/common/entity");
let MemberEntity = class MemberEntity extends entity_1.BaseEntity {
};
exports.MemberEntity = MemberEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MemberEntity.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MemberEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], MemberEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.GroupEntity, group => group.member, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", group_entity_1.GroupEntity)
], MemberEntity.prototype, "group", void 0);
exports.MemberEntity = MemberEntity = __decorate([
    (0, typeorm_1.Entity)('Members')
], MemberEntity);
//# sourceMappingURL=member.entity.js.map