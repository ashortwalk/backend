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
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const member_reopsitory_1 = require("../repositories/member.reopsitory");
let MemberService = class MemberService {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    createMember(groupId, userId, nickname) {
        const result = this.memberRepository.createMember(groupId, userId, nickname);
        return result;
    }
    findMembers(groupId) {
        const result = this.memberRepository.findMembers(groupId);
        return result;
    }
    deleteMember(groupId, userId) {
        const result = this.memberRepository.deleteMember(groupId, userId);
        return result;
    }
};
exports.MemberService = MemberService;
exports.MemberService = MemberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [member_reopsitory_1.MemberRepository])
], MemberService);
//# sourceMappingURL=member.service.js.map