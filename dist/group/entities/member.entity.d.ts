import { GroupEntity } from './group.entity';
import { BaseEntity } from 'src/common/entity';
export declare class MemberEntity extends BaseEntity {
    groupId: string;
    userId: string;
    nickname: string;
    group: GroupEntity;
}
