import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsRepository } from '../repositories';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}

  createComment(postId: string, userId: string, content: string) {
    return this.commentRepository.createComment(postId, userId, content);
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
