import { BaseEntity } from 'src/common/entity';
import { UserRole, UserType } from '../types/user.type';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CommentEntity } from 'src/comments/entities';
import { ReportEntity } from './report.entity';
export declare class UserEntity extends BaseEntity {
    nickname: string;
    email: string;
    password: string;
    role: UserRole;
    type: UserType;
    post: PostEntity[];
    comment: CommentEntity[];
    report: ReportEntity[];
}
