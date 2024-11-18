import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  @UseGuards(AuthGuard())
  async kakaoCallback(
    @Req() req,
    @Res() res,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const loginId = req.user.id;

    if (id !== loginId) {
      console.log(id, loginId);
      throw new BadRequestException();
    }
    return this.userService.updateUser(id, updateUserDto.nickname);
  }
}
