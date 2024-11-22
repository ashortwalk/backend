import { EntityManager, Repository } from 'typeorm';
import { CommentEntity } from '../entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsRepository extends Repository<CommentEntity> {
  constructor(
    @InjectRepository(Comment)
    private readonly repo: Repository<CommentEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createComment() {}
}
