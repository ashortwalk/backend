import { BadRequestException, Injectable } from '@nestjs/common';
import { FeedRepository } from '../repositories/feed.repositories';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}

  async createFeed(content: string, userId: string, groupId: string) {
    const result = await this.feedRepository.createFeed(
      content,
      userId,
      groupId,
    );
    return result;
  }

  async findFeed(feedId: string) {
    const Feed = await this.feedRepository.findFeedById(feedId);
    return Feed;
  }

  async updateFeed(content: string, feedId: string) {
    return await this.feedRepository.updateFeed(content, feedId);
  }

  async deleteFeed(userId: string, role: string, feedId: string) {
    const Feed = await this.feedRepository.findFeedById(feedId);
    if (role !== 'admin') {
      if (userId !== Feed.userId) {
        throw new BadRequestException();
      }
    }

    return await this.feedRepository.deleteFeed(feedId);
  }

  async findFeeds(page: number) {
    const Feeds = await this.feedRepository.findFeeds(page);
    return Feeds;
  }

  countFeeds(groupId: string) {
    return this.feedRepository.countFeeds(groupId);
  }
}
