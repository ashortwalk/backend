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
import { CreatePostDto } from '../dto/create-post.dto';
import { PostService } from '../services/posts.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePostDto } from '../dto/update-post.dto';
import { TokenPayload } from 'src/user/types/user.type';
import { PostEntity } from '../entities';
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}
  @Get('count')
  countTotalPages() {
    return { count: this.postService.countTotalPages() };
  }

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @Req() req: { user: TokenPayload },
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
  getPost(@Param() param: { postId: string }): Promise<PostEntity> {
    const { postId } = param;
    if (!postId) {
      throw new BadRequestException();
    }
    return this.postService.findPost(postId);
  }

  @Get()
  getPosts(@Query() query: { page: number }) {
    let { page } = query;
    if (!page) {
      page = 1;
    }
    return this.postService.findPosts(page);
  }

  @Patch(':postId')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async updatePost(
    @Req() req: { user: TokenPayload },
    @Param() param: { postId: string },
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
  deletePost(@Param() param: { postId: string }) {
    const id = param.postId;
    return this.postService.deletePost(id);
  }
}
