import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateUser(
    @Req() req,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const loginId = req.user.id;
    if (id !== loginId) {
      throw new BadRequestException();
    }
    return await this.userService.updateUser(id, updateUserDto.nickname);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUser(@Req() req, @Param('id') id: string) {
    const loginId = req.user.id;
    if (id !== loginId) {
      throw new BadRequestException();
    }
    return await this.userService.findUser(id);
  }
}
