import { EntityManager, Repository } from 'typeorm';
import { MissionEntity } from '../entities/mission.entity';
export declare class MissionRepository extends Repository<MissionEntity> {
    private readonly repo;
    private readonly entityManager;
    constructor(repo: Repository<MissionEntity>, entityManager: EntityManager);
    createMission(title: string, content: string, userId: string, groupId: string): Promise<MissionEntity>;
}
