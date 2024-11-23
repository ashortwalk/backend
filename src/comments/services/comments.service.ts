import { Injectable } from '@nestjs/common';
import { CommentsRepository } from '../repositories';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}

  createComment(postId: string, userId: string, content: string) {
    return this.commentRepository.createComment(postId, userId, content);
  }
}
