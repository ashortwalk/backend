import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from 'src/user/types/user.type';
import { MemberEntity } from '../entities';
import { MemberService } from '../services/member.service';

@Controller('api/groups/:groupId/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createMember(@Req() req: { user: TokenPayload }, @Param() param) {
    const userId = req.user.id;
    const { groupId } = param;

    return await this.memberService.createMember(groupId, userId);
  }

  @Get()
  getMembers(@Param() param: { groupId: string }): Promise<MemberEntity[]> {
    const { groupId } = param;
    if (!groupId) {
      throw new BadRequestException();
    }
    return this.memberService.findMembers(groupId);
  }

  @Delete()
  @UseGuards(AuthGuard())
  async updateGroup(
    @Req() req: { user: TokenPayload },
    @Param() param: { groupId: string },
  ) {
    const userId = req.user.id;
    const { groupId } = param;
    return await this.memberService.deleteMember(groupId, userId);
  }
}
