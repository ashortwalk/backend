import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from '../services';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from 'src/user/types/user.type';
@Controller('api/posts/:id/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard())
  createComment(
    @Req() req: { user: TokenPayload },
    @Param() postId: string,
    @Body() body: { content: string },
  ) {
    const userId = req.user.id;
    const { content } = body;
    return this.commentService.createComment(postId, userId, content);
  }
}
