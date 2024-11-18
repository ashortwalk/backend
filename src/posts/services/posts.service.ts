import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostRepository } from '../repositories/posts.repository';
import { AzureBlobService } from './azure-blob.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,

    private readonly azureBlobService: AzureBlobService,
  ) {}

  async createPost(
    userId: string,
    nickname: string,
    file: Express.Multer.File,
    createPostDto: CreatePostDto,
  ) {
    const imgURL = await this.azureBlobService.upload(file, 'images');
    return this.postRepository.createPost(
      userId,
      nickname,
      imgURL,
      createPostDto,
    );
  }
}
