import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}
  @Get('count')
  async countTotalPages() {
    return { count: await this.postService.countTotalPages() };
  }

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

  @Patch(':postId')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async updatePost(
    @Req() req,
    @Param() param,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user.id;
    const { postId } = param;
    if (!postId) {
      throw new BadRequestException();
    }
    return await this.postService.updatePost(
      userId,
      postId,
      updatePostDto,
      file,
    );
  }

  @Delete(':postId')
  async deletePost(@Param() param) {
    const id = param.postId;
    return await this.postService.deletePost(id);
  }
}
