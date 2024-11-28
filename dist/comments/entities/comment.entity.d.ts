import { BaseEntity } from 'src/common/entity';
import { PostEntity } from 'src/posts/entities';
import { UserEntity } from 'src/user/entities';
export declare class CommentEntity extends BaseEntity {
    content: string;
    userId: string;
    postId: string;
    nickname: string;
    user: UserEntity;
    post: PostEntity;
}
