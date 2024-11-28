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
exports.UserEntity = void 0;
const entity_1 = require("../../common/entity");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../../posts/entities/post.entity");
const entities_1 = require("../../comments/entities");
const report_entity_1 = require("./report.entity");
let UserEntity = class UserEntity extends entity_1.BaseEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, default: 'user' }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, default: 'email' }),
    __metadata("design:type", String)
], UserEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.PostEntity, post => post.user, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.CommentEntity, comment => comment.user, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_entity_1.ReportEntity, report => report.user, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "report", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('Users')
], UserEntity);
//# sourceMappingURL=user.entity.js.map