import { PostService } from '../services/posts.service';
import { TokenPayload } from 'src/user/types/user.type';
export declare class StatisticsController {
    private readonly postService;
    constructor(postService: PostService);
    statistics(req: {
        user: TokenPayload;
    }): Promise<any[]>;
}
