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
exports.AdminCommentController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
const passport_1 = require("@nestjs/passport");
const auth_guard_1 = require("../../user/guard/auth.guard");
let AdminCommentController = class AdminCommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    getComment(param) {
        const { commentId } = param;
        return this.commentService.adminFindComment(commentId);
    }
};
exports.AdminCommentController = AdminCommentController;
__decorate([
    (0, common_1.Get)(':commentId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, auth_guard_1.Roles)('admin'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminCommentController.prototype, "getComment", null);
exports.AdminCommentController = AdminCommentController = __decorate([
    (0, common_1.Controller)('api/comments'),
    __metadata("design:paramtypes", [services_1.CommentsService])
], AdminCommentController);
//# sourceMappingURL=admin-comment.controller.js.map