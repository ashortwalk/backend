import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from '../services';
import { AuthGuard } from 'src/user/guard';
import { Roles } from 'src/user/guard/roles.decorator';

@Controller('api/comments')
export class AdminCommentController {
  constructor(private readonly commentService: CommentsService) {}

  @Get(':commentId')
  @UseGuards(AuthGuard)
  @Roles('admin')
  getComment(@Param() param: { commentId: string }) {
    const { commentId } = param;
    return this.commentService.adminFindComment(commentId);
  }
}
