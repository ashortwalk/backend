import { GroupEntity } from '../entities';
import { EntityManager, Repository } from 'typeorm';
export declare class GroupRepository extends Repository<GroupEntity> {
    private readonly repo;
    private readonly entityManager;
    constructor(repo: Repository<GroupEntity>, entityManager: EntityManager);
    createGroup(groupName: string, description: string, tag: string, leaderUserId: string, leaderNickname: string): Promise<GroupEntity>;
    findGroupById(groupId: string): Promise<GroupEntity>;
    updateGroup(id: string, groupName: string, description: string, tag: string): Promise<GroupEntity>;
    deleteGroup(id: string): Promise<boolean>;
    findGroups(page: number): Promise<GroupEntity[]>;
    countTotalGroups(): Promise<number>;
    myGroups(userId: string): Promise<GroupEntity[]>;
    deleteGroupByName(groupName: string): Promise<boolean>;
}
