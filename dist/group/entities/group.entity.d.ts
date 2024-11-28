import { MemberEntity } from './member.entity';
import { BaseEntity } from 'src/common/entity';
import { FeedEntity } from 'src/feeds/entities/feed.entity';
export declare class GroupEntity extends BaseEntity {
    leaderUserId: string;
    leaderNickname: string;
    groupName: string;
    description: string;
    tag: string;
    member: MemberEntity[];
    feed: FeedEntity[];
}
