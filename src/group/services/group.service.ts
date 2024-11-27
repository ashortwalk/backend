import { BadRequestException, Injectable } from '@nestjs/common';
import { GroupRepository } from '../repositories';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) { }

  async createGroup(
    groupName: string,
    description: string,
    tag: string,
    leaderUserId: string,
  ) {
    const result = await this.groupRepository.createGroup(
      groupName,
      description,
      tag,
      leaderUserId,
    );
    return result;
  }

  async findGroup(id: string) {
    const group = await this.groupRepository.findGroupById(id);
    return group;
  }

  async updateGroup(
    id: string,
    groupName: string,
    description: string,
    tag: string,
  ) {
    return await this.groupRepository.updateGroup(
      id,
      groupName,
      description,
      tag,
    );
  }

  async deleteGroup(userId: string, role: string, id: string) {
    const group = await this.groupRepository.findGroupById(id);
    if (role !== 'admin') {
      if (userId !== group.leaderUserId) {
        throw new BadRequestException();
      }
    }

    return await this.groupRepository.deleteGroup(id);
  }

  async findGroups(page: number) {
    const groups = await this.groupRepository.findGroups(page);
    return groups;
  }

  async countTotalPages() {
    const count = await this.groupRepository.countTotalGroups();
    return count[0];
  }

  async myGroups(id: string) {
    const groups = await this.groupRepository.myGroups(id);
    return groups;
  }

  async deleteGroupByName(groupName: string) {
    return await this.groupRepository.deleteGroupByName(groupName);
  }
}
