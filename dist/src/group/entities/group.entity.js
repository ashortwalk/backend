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
exports.GroupEntity = void 0;
const typeorm_1 = require("typeorm");
const member_entity_1 = require("./member.entity");
const entity_1 = require("src/common/entity");
const feed_entity_1 = require("src/feeds/entities/feed.entity");
let GroupEntity = class GroupEntity extends entity_1.BaseEntity {
};
exports.GroupEntity = GroupEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], GroupEntity.prototype, "leaderUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], GroupEntity.prototype, "leaderNickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], GroupEntity.prototype, "groupName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], GroupEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], GroupEntity.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => member_entity_1.MemberEntity, member => member.group, { cascade: true }),
    __metadata("design:type", Array)
], GroupEntity.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feed_entity_1.FeedEntity, feed => feed.group, { cascade: true }),
    __metadata("design:type", Array)
], GroupEntity.prototype, "feed", void 0);
exports.GroupEntity = GroupEntity = __decorate([
    (0, typeorm_1.Entity)('Groups')
], GroupEntity);
//# sourceMappingURL=group.entity.js.map