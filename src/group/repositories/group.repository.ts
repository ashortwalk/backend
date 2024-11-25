import { BadRequestException, Injectable } from '@nestjs/common';
import { GroupEntity } from '../entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IntegerType, Repository } from 'typeorm';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class GroupRepository extends Repository<GroupEntity> {
    constructor(
        @InjectRepository(GroupEntity)
        private readonly repo: Repository<GroupEntity>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }


    async createGroup(
        groupName: string,
        description: string,
        tag: string,
        leaderUserId: string,
    ) {
        const group = new GroupEntity();
        group.leaderUserId = leaderUserId
        group.groupName = groupName;
        group.description = description;
        group.tag = tag;
        return await this.save(group);
    }

    async findGroupById(groupId: string) {
        const group = await this.findOneBy({ id: groupId });
        if (!group) {
            throw new BadRequestException();
        }
        return group;
    }

    async updateGroup(
        id: string,
        groupName: string,
        description: string,
        tag: string,
    ) {
        const group = await this.findOneBy({ id });
        if (!group) {
            throw new BadRequestException();
        }

        group.groupName = groupName;
        group.description = description;
        group.tag = tag;

        const updatedGroup = this.save(group);
        return updatedGroup;
    }
}
