import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
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

  @Get(':postId')
  async getPost(@Param() param) {
    const { postId } = param;
    if (!postId) {
      throw new BadRequestException();
    }
    return await this.postService.findPost(postId);
  }

  @Get()
  async getPosts(@Query() query) {
    let { page } = query;
    if (!page) {
      page = 1;
    }
    return await this.postService.findPosts(page);
  }
}
