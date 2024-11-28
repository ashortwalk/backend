import { BaseEntity } from 'src/common/entity';
import { GroupEntity } from 'src/group/entities';
export declare class FeedEntity extends BaseEntity {
    content: string;
    userId: string;
    groupId: string;
    group: GroupEntity;
}
