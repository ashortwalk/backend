import { MemberRepository } from '../repositories/member.reopsitory';
import { MemberEntity } from '../entities';
export declare class MemberService {
    private readonly memberRepository;
    constructor(memberRepository: MemberRepository);
    createMember(groupId: string, userId: string, nickname: string): Promise<MemberEntity>;
    findMembers(groupId: string): Promise<MemberEntity[]>;
    deleteMember(groupId: string, userId: string): Promise<boolean>;
}
