import { BadRequestException, Injectable } from '@nestjs/common';
import { FeedRepository } from '../repositories/feed.repositories';

@Injectable()
export class FeedService {
    constructor(private readonly FeedRepository: FeedRepository) { }

    async createFeed(
        content: string,
        userId: string,
        groupId: string
    ) {
        const result = await this.FeedRepository.createFeed(
            content,
            userId,
            groupId
        );
        return result;
    }

    async findFeed(feedId: string) {
        const Feed = await this.FeedRepository.findFeedById(feedId);
        return Feed;
    }

    async updateFeed(
        content: string,
        feedId: string
    ) {
        return await this.FeedRepository.updateFeed(
            content,
            feedId
        );
    }

    async deleteFeed(userId: string, role: string, feedId: string) {
        const Feed = await this.FeedRepository.findFeedById(feedId);
        if (role !== 'admin') {
            if (userId !== Feed.userId) {
                throw new BadRequestException();
            }
        }

        return await this.FeedRepository.deleteFeed(feedId);
    }

    async findFeeds(page: number) {
        const Feeds = await this.FeedRepository.findFeeds(page);
        return Feeds;
    }
}
