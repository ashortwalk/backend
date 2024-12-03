import { BaseEntity } from 'src/common/entity';
import { CompleteEntity } from './complete.entity';
export declare class MissionEntity extends BaseEntity {
    content: string;
    title: string;
    leaderId: string;
    groupId: string;
    complete: CompleteEntity[];
}
