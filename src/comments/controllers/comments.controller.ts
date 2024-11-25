import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../services';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from 'src/user/types/user.type';
@Controller('api/posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard())
  createComment(
    @Req() req: { user: TokenPayload },
    @Param() param: { postId: string },
    @Body() body: { content: string },
  ) {
    const userId = req.user.id;
    const { postId } = param;
    const { content } = body;
    return this.commentService.createComment(postId, userId, content);
  }

  @Get()
  getComments(@Param() param: { postId: string }) {
    const { postId } = param;
    return this.commentService.findComments(postId);
  }

  @Patch(':commentId')
  @UseGuards(AuthGuard())
  updateComment(
    @Req() req: { user: TokenPayload },
    @Param() param: { postId: string; commentId: string },
    @Body() body: { content: string },
  ) {
    const userId = req.user.id;
    const { postId, commentId } = param;
    const { content } = body;
    return this.commentService.updateComment(
      postId,
      commentId,
      userId,
      content,
    );
  }

  @Delete(':commentId')
  @UseGuards(AuthGuard())
  deleteComment(
    @Req() req: { user: TokenPayload },
    @Param() param: { postId: string; commentId: string },
  ) {
    const userId = req.user.id;
    const role = req.user.role;
    const { postId, commentId } = param;

    return this.commentService.deleteComment(postId, commentId, userId, role);
  }
}
