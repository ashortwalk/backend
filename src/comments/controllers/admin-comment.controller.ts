import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from '../services';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/comments')
export class AdminCommentController {
  constructor(private readonly commentService: CommentsService) {}

  @Get(':commentId')
  @UseGuards(AuthGuard('admin'))
  getComment(@Param() param: { commentId: string }) {
    const { commentId } = param;
    return this.commentService.adminFindComment(commentId);
  }
}
