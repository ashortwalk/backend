import { BaseEntity } from 'src/common/entity';
import { MissionEntity } from './mission.entity';
export declare class CompleteEntity extends BaseEntity {
    userId: string;
    groupId: string;
    mission: MissionEntity;
}
