import { FeedRepository } from '../repositories/feed.repositories';
export declare class FeedService {
    private readonly feedRepository;
    constructor(feedRepository: FeedRepository);
    createFeed(content: string, userId: string, groupId: string): Promise<import("../entities/feed.entity").FeedEntity>;
    findFeed(feedId: string): Promise<import("../entities/feed.entity").FeedEntity>;
    updateFeed(content: string, feedId: string): Promise<import("../entities/feed.entity").FeedEntity>;
    deleteFeed(userId: string, role: string, feedId: string): Promise<boolean>;
    findFeeds(page: number): Promise<import("../entities/feed.entity").FeedEntity[]>;
    countFeeds(groupId: string): Promise<number>;
}
