import { EntityManager, Repository } from 'typeorm';
import { FeedEntity } from '../entities/feed.entity';
import { GroupRepository } from 'src/group/repositories';
export declare class FeedRepository extends Repository<FeedEntity> {
    private readonly repo;
    private readonly entityManager;
    private readonly groupRepository;
    constructor(repo: Repository<FeedEntity>, entityManager: EntityManager, groupRepository: GroupRepository);
    createFeed(content: string, userId: string, groupId: string): Promise<FeedEntity>;
    findFeedById(FeedId: string): Promise<FeedEntity>;
    updateFeed(content: string, feedId: string): Promise<FeedEntity>;
    deleteFeed(feedId: string): Promise<boolean>;
    findFeeds(page: number): Promise<FeedEntity[]>;
    countFeeds(groupId: string): Promise<number>;
}
