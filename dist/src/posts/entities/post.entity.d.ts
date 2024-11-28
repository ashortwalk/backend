import { CommentEntity } from 'src/comments/entities';
import { BaseEntity } from 'src/common/entity';
import { UserEntity } from 'src/user/entities';
export declare class PostEntity extends BaseEntity {
    title: string;
    content: string;
    image: string;
    thumbnail: string;
    category: string;
    viewCount: number;
    userId: string;
    nickname: string;
    user: UserEntity;
    comment: CommentEntity[];
}
