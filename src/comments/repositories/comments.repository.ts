import { EntityManager, Repository } from 'typeorm';
import { CommentEntity } from '../entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repositories';
import { PostRepository } from 'src/posts/repositories/posts.repository';

@Injectable()
export class CommentsRepository extends Repository<CommentEntity> {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repo: Repository<CommentEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createComment(postId: string, userId: string, content: string) {
    const user = await this.userRepository.findUserById(userId);
    const post = await this.postRepository.findPostById(postId);
    const comment = new CommentEntity();
    comment.user = user;
    comment.post = post;
    comment.nickname = user.nickname;
    comment.content = content;
    comment.userId = userId;
    comment.postId = post.id;

    return await this.save(comment);
  }
  async findComments(postId: string) {
    return await this.findBy({ postId });
  }

  async findCommentById(postId: string, commentId: string) {
    return await this.findOneBy({ id: commentId, postId });
  }

  async updateComment(
    postId: string,
    commentId: string,
    userId: string,
    content: string,
  ) {
    const comment = await this.findOneBy({ id: commentId, postId });
    comment.content = content;

    return await this.save(comment);
  }
}
