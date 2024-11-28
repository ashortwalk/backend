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
exports.FeedEntity = void 0;
const entity_1 = require("../../common/entity");
const entities_1 = require("../../group/entities");
const typeorm_1 = require("typeorm");
let FeedEntity = class FeedEntity extends entity_1.BaseEntity {
};
exports.FeedEntity = FeedEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], FeedEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], FeedEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], FeedEntity.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.GroupEntity, group => group.feed, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", entities_1.GroupEntity)
], FeedEntity.prototype, "group", void 0);
exports.FeedEntity = FeedEntity = __decorate([
    (0, typeorm_1.Entity)('Feeds')
], FeedEntity);
//# sourceMappingURL=feed.entity.js.map