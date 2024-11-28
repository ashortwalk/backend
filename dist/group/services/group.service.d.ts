import { GroupRepository } from '../repositories';
import { MemberRepository } from '../repositories/member.reopsitory';
export declare class GroupService {
    private readonly groupRepository;
    private readonly memberRepository;
    constructor(groupRepository: GroupRepository, memberRepository: MemberRepository);
    createGroup(groupName: string, description: string, tag: string, leaderUserId: string, leaderNickname: string): Promise<import("../entities").GroupEntity>;
    findGroup(id: string): Promise<import("../entities").GroupEntity>;
    updateGroup(id: string, groupName: string, description: string, tag: string): Promise<import("../entities").GroupEntity>;
    deleteGroup(userId: string, role: string, id: string): Promise<boolean>;
    findGroups(page: number): Promise<import("../entities").GroupEntity[]>;
    countTotalPages(): Promise<number>;
    myGroups(userId: string): Promise<import("../entities").GroupEntity[]>;
    deleteGroupByName(groupName: string): Promise<boolean>;
}
