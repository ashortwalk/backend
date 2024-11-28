import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostRepository } from '../repositories/posts.repository';
import { AzureBlobService } from './azure-blob.service';
import { ResizeImagePipe } from './resize.service';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly resizeImagePipe: ResizeImagePipe,
    private readonly azureBlobService: AzureBlobService,
  ) {}

  async createPost(
    userId: string,
    nickname: string,
    file,
    createPostDto: CreatePostDto,
  ) {
    let imgURL = null;
    let thumbnail = null;
    let thumbnailURL = null;
    if (file) {
      imgURL = await this.azureBlobService.upload(file, 'images');
      thumbnail = await this.resizeImagePipe.transform(file);
      thumbnailURL = await this.azureBlobService.upload(
        thumbnail,
        'thumbnails',
      );
    }

    return this.postRepository.createPost(
      userId,
      nickname,
      imgURL,
      thumbnailURL,
      createPostDto,
    );
  }

  async findPost(postId: string) {
    const post = await this.postRepository.findPostById(postId);
    return post;
  }

  async findPosts(page: number) {
    const posts = await this.postRepository.findPosts(page);
    return posts;
  }

  async updatePost(
    userId: string,
    postId: string,
    updatePostDto: UpdatePostDto,
    file,
  ) {
    const post = await this.postRepository.findPostById(postId);
    if (post.userId !== userId) {
      throw new BadRequestException();
    }

    let imgURL;
    let thumbnailURL;
    if (file) {
      imgURL = await this.azureBlobService.upload(file, 'images');
      const thumbnail = await this.resizeImagePipe.transform(file);
      thumbnailURL = await this.azureBlobService.upload(
        thumbnail,
        'thumbnails',
      );
      await this.azureBlobService.deleteFile(post.image, 'images');
      await this.azureBlobService.deleteFile(post.thumbnail, 'thumbnails');
    }

    return await this.postRepository.updatePostById(
      postId,
      updatePostDto,
      imgURL,
      thumbnailURL,
    );
  }

  async deletePost(userId: string, role: string, id: string) {
    const post = await this.postRepository.findPostById(id);

    if (role !== 'admin') {
      if (post.userId !== userId) {
        throw new BadRequestException();
      }
    }

    return await this.postRepository.deletePostById(id);
  }
  async statisticsByCategory(userId: string) {
    return await this.postRepository.statisticsByCategory(userId);
  }

  async countTotalPages() {
    const result = Math.ceil((await this.postRepository.countTotalPosts()) / 6);
    return result;
  }
}
