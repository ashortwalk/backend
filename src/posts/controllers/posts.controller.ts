import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/user/guard/auth.guard';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostService } from '../services/posts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard())
  @Roles('user')
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = req.user.id;
    const nickname = req.user.nickname;
    return await this.postService.createPost(
      userId,
      nickname,
      file,
      createPostDto,
    );
  }
}
