import { MemberEntity } from '../entities';
import { EntityManager, Repository } from 'typeorm';
import { GroupRepository } from './group.repository';
export declare class MemberRepository extends Repository<MemberEntity> {
    private readonly repo;
    private readonly entityManager;
    private readonly groupRepository;
    constructor(repo: Repository<MemberEntity>, entityManager: EntityManager, groupRepository: GroupRepository);
    createMember(groupId: string, userId: string, nickname: string): Promise<MemberEntity>;
    findMembers(groupId: string): Promise<MemberEntity[]>;
    deleteMember(groupId: string, userId: string): Promise<boolean>;
}
