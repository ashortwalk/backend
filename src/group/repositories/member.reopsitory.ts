import { BadRequestException, Injectable } from '@nestjs/common';
import { MemberEntity } from '../entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { GroupRepository } from './group.repository';
@Injectable()
export class MemberRepository extends Repository<MemberEntity> {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly repo: Repository<MemberEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly groupRepository: GroupRepository,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createMember(groupId: string, userId: string): Promise<MemberEntity> {
    const member = new MemberEntity();
    const group = await this.groupRepository.findGroupById(groupId);
    member.groupId = groupId;
    member.userId = userId;
    member.group = group;
    return await this.save(member);
  }

  async findMembers(groupId: string): Promise<MemberEntity[]> {
    const members = await this.findBy({ groupId });
    return members;
  }
  async deleteMember(groupId: string, userId: string): Promise<boolean> {
    const isDeleted = await this.softRemove({ groupId, userId });
    if (!isDeleted) {
      throw new BadRequestException();
    }
    return true;
  }
}
