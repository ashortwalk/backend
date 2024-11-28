import { EntityManager, Repository } from 'typeorm';
import { CommentEntity } from '../entities';
import { UserRepository } from 'src/user/repositories';
import { PostRepository } from 'src/posts/repositories/posts.repository';
export declare class CommentsRepository extends Repository<CommentEntity> {
    private readonly repo;
    private readonly entityManager;
    private readonly userRepository;
    private readonly postRepository;
    constructor(repo: Repository<CommentEntity>, entityManager: EntityManager, userRepository: UserRepository, postRepository: PostRepository);
    createComment(postId: string, userId: string, content: string): Promise<CommentEntity>;
    findComments(postId: string): Promise<CommentEntity[]>;
    findCommentById(postId: string, commentId: string): Promise<CommentEntity>;
    adminFindCommentById(commentId: string): Promise<CommentEntity>;
    updateComment(postId: string, commentId: string, userId: string, content: string): Promise<CommentEntity>;
    deleteComment(commentId: string): Promise<boolean>;
}
