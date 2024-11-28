import { FeedService } from '../services/feed.services';
import { TokenPayload } from 'src/user/types/user.type';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    feedGroup(param: any, body: {
        content: string;
    }, req: {
        user: TokenPayload;
    }): Promise<import("../entities/feed.entity").FeedEntity>;
    updateGroup(req: {
        user: TokenPayload;
    }, param: {
        groupId: string;
        feedId: string;
    }, body: {
        content: string;
    }): Promise<import("../entities/feed.entity").FeedEntity>;
    deleteUser(req: any, param: {
        feedId: string;
    }): Promise<boolean>;
    getFeeds(query: {
        page: number;
    }): Promise<import("../entities/feed.entity").FeedEntity[]>;
    countFeeds(param: {
        groupId: string;
    }): Promise<number>;
}
