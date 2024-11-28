import { CommentsRepository } from '../repositories';
import { RedisModule } from 'src/common/redis';
export declare class CommentsService {
    private readonly commentRepository;
    private readonly redisModule;
    constructor(commentRepository: CommentsRepository, redisModule: RedisModule);
    createComment(postId: string, userId: string, nickname: string, content: string): Promise<import("../entities").CommentEntity>;
    findComments(postId: string): Promise<import("../entities").CommentEntity[]>;
    adminFindComment(commentId: string): Promise<import("../entities").CommentEntity>;
    updateComment(postId: string, commentId: string, userId: string, content: string): Promise<import("../entities").CommentEntity>;
    deleteComment(postId: string, commentId: string, userId: string, role: string): Promise<boolean>;
}
