import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/guard/auth.guard';
@Controller('api/posts')
export class PostsController {
  @Get()
  @UseGuards(AuthGuard)
  @Roles('user')
  async getPosts() {
    return true;
  }
}
