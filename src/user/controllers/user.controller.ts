import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteUser(@Req() req, @Param('id') id: string) {
    const loginId = req.user.id;
    if (id !== loginId) {
      throw new BadRequestException();
    }
    return await this.userService.deleteUser(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getUser(@Req() req) {
    const id = req.user.id;
    return await this.userService.findUser(id);
  }
}
