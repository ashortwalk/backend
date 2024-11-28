import { TokenPayload } from 'src/user/types/user.type';
import { MemberEntity } from '../entities';
import { MemberService } from '../services/member.service';
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    createMember(req: {
        user: TokenPayload;
    }, param: any): Promise<MemberEntity>;
    getMembers(param: {
        groupId: string;
    }): Promise<MemberEntity[]>;
    updateGroup(req: {
        user: TokenPayload;
    }, param: {
        groupId: string;
    }): Promise<boolean>;
}
