import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostRepository } from '../repositories/posts.repository';
import { AzureBlobService } from './azure-blob.service';
import { ResizeImagePipe } from './resize.service';

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
    file: Express.Multer.File,
    createPostDto: CreatePostDto,
  ) {
    const imgURL = await this.azureBlobService.upload(file, 'images');
    const thumbnail = await this.resizeImagePipe.transform(file);
    const thumbnailURL = await this.azureBlobService.upload(
      thumbnail,
      'thumbnails',
    );
    return this.postRepository.createPost(
      userId,
      nickname,
      imgURL,
      thumbnailURL,
      createPostDto,
    );
  }
}
