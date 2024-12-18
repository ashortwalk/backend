import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities';
import { UserRepository } from 'src/user/repositories';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repo: Repository<PostEntity>,
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

    const post = new PostEntity();
    post.user = user;
    post.userId = userId;
    post.nickname = nickname;
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.category = createPostDto.category;

    if (imgURL) {
      post.image = imgURL;
      post.thumbnail = thumbnailURL;
    }

    const result = await this.save(post);
    delete result.user.password;
    return result;
  }

  async findPostById(postId: string) {
    const post = await this.findOneBy({ id: postId });
    if (!post) {
      throw new BadRequestException();
    }
    post.viewCount = post.viewCount + 1;
    this.save(post);
    return post;
  }

  async findPosts(page: number) {
    const limit = 6;
    const posts = await this.find({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        createdAt: true,
        nickname: true,
        viewCount: true,
        category:true,
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
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
    await this.softRemove({ id: postId });
    const post = await this.findOneBy({ id: postId });

    if (post) {
      throw new InternalServerErrorException();
    }
    return true;
  }

  async statisticsByCategory(userId: string) {
    return await this.createQueryBuilder('post')
      .select('post.category', 'category')
      .addSelect('COUNT(post.id)', 'count')
      .where('post.user.id = :userId', { userId })
      .groupBy('post.category')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();
  }
  async countTotalPosts() {
    return await this.count();
  }
}
