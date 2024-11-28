import { CommentsService } from '../services';
export declare class AdminCommentController {
    private readonly commentService;
    constructor(commentService: CommentsService);
    getComment(param: {
        commentId: string;
    }): Promise<import("../entities").CommentEntity>;
}
