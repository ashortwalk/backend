import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MissionRepository } from '../repositories/mission.repositories';
import { GroupRepository } from 'src/group/repositories';

@Injectable()
export class MissionService {
  constructor(
    private readonly missionRepository: MissionRepository,
    private readonly groupRepository: GroupRepository,
  ) { }

  async createMission(
    title: string,
    content: string,
    userId: string,
    groupId: string,
  ) {
    const group = await this.groupRepository.findGroupById(groupId);
    if (group.leaderUserId !== userId) {
      throw new UnauthorizedException();
    }
    const result = await this.missionRepository.createMission(
      title,
      content,
      userId,
      groupId,
    );
    return result;
  }

  async findMission(missionId: string) {
    const Mission = await this.missionRepository.findMissionById(missionId);
    return Mission;
  }

  async updateMission(content: string, missionId: string, userId: string, groupId: string,) {

    const group = await this.groupRepository.findGroupById(groupId);
    if (group.leaderUserId !== userId) {
      throw new UnauthorizedException();
    }
    return await this.missionRepository.updateMission(content, missionId);
  }


}
