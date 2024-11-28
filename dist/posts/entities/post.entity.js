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
exports.PostEntity = void 0;
const entities_1 = require("../../comments/entities");
const entity_1 = require("../../common/entity");
const entities_2 = require("../../user/entities");
const typeorm_1 = require("typeorm");
let PostEntity = class PostEntity extends entity_1.BaseEntity {
};
exports.PostEntity = PostEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], PostEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PostEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], PostEntity.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], PostEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], PostEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_2.UserEntity, user => user.post, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", entities_2.UserEntity)
], PostEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.CommentEntity, comment => comment.post, { cascade: true }),
    __metadata("design:type", Array)
], PostEntity.prototype, "comment", void 0);
exports.PostEntity = PostEntity = __decorate([
    (0, typeorm_1.Entity)('Posts')
], PostEntity);
//# sourceMappingURL=post.entity.js.map