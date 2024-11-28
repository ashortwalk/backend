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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../services");
const passport_1 = require("@nestjs/passport");
let CommentsController = class CommentsController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    createComment(req, param, body) {
        const userId = req.user.id;
        const nickname = req.user.nickname;
        const { postId } = param;
        const { content } = body;
        return this.commentService.createComment(postId, userId, nickname, content);
    }
    getComments(param) {
        const { postId } = param;
        return this.commentService.findComments(postId);
    }
    updateComment(req, param, body) {
        const userId = req.user.id;
        const { postId, commentId } = param;
        const { content } = body;
        return this.commentService.updateComment(postId, commentId, userId, content);
    }
    deleteComment(req, param) {
        const userId = req.user.id;
        const role = req.user.role;
        const { postId, commentId } = param;
        return this.commentService.deleteComment(postId, commentId, userId, role);
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "getComments", null);
__decorate([
    (0, common_1.Patch)(':commentId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)(':commentId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "deleteComment", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)('api/posts/:postId/comments'),
    __metadata("design:paramtypes", [services_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map