import { MissionRepository } from '../repositories/mission.repositories';
import { GroupRepository } from 'src/group/repositories';
export declare class MissionService {
    private readonly missionRepository;
    private readonly groupRepository;
    constructor(missionRepository: MissionRepository, groupRepository: GroupRepository);
    createMission(title: string, content: string, userId: string, groupId: string): Promise<import("../entities/mission.entity").MissionEntity>;
}
