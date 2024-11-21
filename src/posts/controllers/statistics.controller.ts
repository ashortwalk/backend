import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PostService } from '../services/posts.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/user/guard/auth.guard';

@Controller('api/statistics')
export class StatisticsController {
  constructor(private readonly postService: PostService) {}
  @Get('category')
  @UseGuards(AuthGuard())
  @Roles('user')
  async statistics(@Req() req) {
    const userId = req.user.id;
    return await this.postService.statisticsByCateogry(userId);
  }
}
