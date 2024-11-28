import { CommentsService } from '../services';
import { TokenPayload } from 'src/user/types/user.type';
export declare class CommentsController {
    private readonly commentService;
    constructor(commentService: CommentsService);
    createComment(req: {
        user: TokenPayload;
    }, param: {
        postId: string;
    }, body: {
        content: string;
    }): Promise<import("../entities").CommentEntity>;
    getComments(param: {
        postId: string;
    }): Promise<import("../entities").CommentEntity[]>;
    updateComment(req: {
        user: TokenPayload;
    }, param: {
        postId: string;
        commentId: string;
    }, body: {
        content: string;
    }): Promise<import("../entities").CommentEntity>;
    deleteComment(req: {
        user: TokenPayload;
    }, param: {
        postId: string;
        commentId: string;
    }): Promise<boolean>;
}
