import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsRepository } from '../repositories';
import { RedisModule } from 'src/common/redis';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly redisModule: RedisModule,
  ) {}

  async createComment(
    postId: string,
    userId: string,
    nickname: string,
    content: string,
  ) {
    const isOnRelay = await this.redisModule.getValue(`OnRelay_${userId}`);
    console.log(isOnRelay);
    if (!isOnRelay) {
      const adminId = process.env.ADMIN_USER_ID;
      await this.redisModule.setValue(`OnRelay_${userId}`, 'true', 604800000);
      await this.commentRepository.createComment(
        postId,
        adminId,
        `👟  ${nickname} 님이 다음 산책에 당첨되셨습니다! 짧은산책 후기를 부탁드려요!`,
      );
    }
    return await this.commentRepository.createComment(postId, userId, content);
  }

  findComments(postId: string) {
    return this.commentRepository.findComments(postId);
  }

  async updateComment(
    postId: string,
    commentId: string,
    userId: string,
    content: string,
  ) {
    const prevComment = await this.commentRepository.findCommentById(
      postId,
      commentId,
    );
    if (prevComment.userId !== userId) {
      throw new BadRequestException();
    }
    const comment = await this.commentRepository.updateComment(
      postId,
      commentId,
      userId,
      content,
    );
    return comment;
  }

  async deleteComment(
    postId: string,
    commentId: string,
    userId: string,
    role: string,
  ) {
    const prevComment = await this.commentRepository.findCommentById(
      postId,
      commentId,
    );

    if (role !== 'admin') {
      if (prevComment.userId !== userId) {
        throw new BadRequestException();
      }
    }

    const comment = await this.commentRepository.deleteComment(commentId);
    return comment;
  }
}
