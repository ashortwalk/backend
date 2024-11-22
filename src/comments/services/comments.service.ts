import { Injectable } from '@nestjs/common';
import { CommentsRepository } from '../repositories';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}
}
