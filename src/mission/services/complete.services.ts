import { ConflictException, Injectable } from '@nestjs/common';
import { CompleteRepository } from '../repositories/complete.repositories';
import { MissionRepository } from '../repositories/mission.repositories';

@Injectable()
export class CompleteService {
  constructor(
    private readonly compeleteReopsitory: CompleteRepository,
    private readonly missionRepository: MissionRepository,
  ) {}

  async createCompelete(userId: string, groupId: string) {
    const mission = await this.missionRepository.findMissionById(groupId);
    const isComplete = await this.compeleteReopsitory.findComplete(
      userId,
      mission.id,
    );
    if (isComplete) {
      throw new ConflictException();
    }
    return await this.compeleteReopsitory.createComplete(userId, groupId);
  }

  async countCompletes(groupId: string) {
    return await this.compeleteReopsitory.countCompletes(groupId);
  }

  async isComplete(userId: string, groupId: string) {
    return await this.compeleteReopsitory.findComplete(userId, groupId);
  }
}
