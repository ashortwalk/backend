import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PostService } from '../services/posts.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/user/guard/auth.guard';
import { TokenPayload } from 'src/user/types/user.type';

@Controller('api/statistics')
export class StatisticsController {
  constructor(private readonly postService: PostService) {}
  @Get('category')
  @UseGuards(AuthGuard())
  @Roles('user')
  async statistics(@Req() req: { user: TokenPayload }) {
    const userId = req.user.id;
    return await this.postService.statisticsByCategory(userId);
  }
}
