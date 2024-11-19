import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '../entities';
import { UserRepository } from 'src/user/repositories';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly userRepository: UserRepository,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createPost(
    userId: string,
    nickname: string,
    imgURL: string,
    thumbnailURL: string,
    createPostDto: CreatePostDto,
  ) {
    const user = await this.userRepository.findUserById(userId);

    const post = new Post();
    post.user = user;
    post.userId = userId;
    post.nickname = nickname;
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.category = createPostDto.category;
    post.image = imgURL;
    post.thumbnail = thumbnailURL;
    const result = await this.save(post);
    delete result.user.password;
    return result;
  }

  async findPostById(postId: string) {
    const post = await this.findOneBy({ id: postId });
    if (!post) {
      throw new BadRequestException();
    }
    return post;
  }

  async findPosts(page: number) {
    const limit = 10;
    const posts = await this.find({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        createdAt: true,
        nickname: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return posts;
  }

  async updatePostById(
    postId: string,
    updatePostDto: UpdatePostDto,
    imgURL: string,
    thumbnailURL: string,
  ) {
    const post = await this.findOneBy({ id: postId });
    if (!post) {
      throw new BadRequestException();
    }
    if (post.title) {
      post.title = updatePostDto.title;
    }
    if (post.content) {
      post.content = updatePostDto.content;
    }
    if (post.category) {
      post.category = updatePostDto.category;
    }

    if (imgURL) {
      post.image = imgURL;
      post.thumbnail = thumbnailURL;
    }
    const updatedPost = this.save(post);
    return updatedPost;
  }

  async deletePostById(postId: string) {
    await this.delete({ id: postId });
    const post = await this.findOneBy({ id: postId });
    if (post) {
      throw new InternalServerErrorException();
    }
    return true;
  }
}
