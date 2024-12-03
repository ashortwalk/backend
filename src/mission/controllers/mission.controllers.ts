import { Body, Controller, Param, Post, Req, UseGuards, Get, Patch, BadRequestException } from '@nestjs/common';
import { MissionService } from '../services/mission.services';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from 'src/user/types/user.type';

@Controller('api/groups/:groupId/missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) { }

  @Post()
  @UseGuards(AuthGuard())
  async feedGroup(
    @Param() param,
    @Body() body: { title: string; content: string },
    @Req() req: { user: TokenPayload },
  ) {
    const { title, content } = body;
    const userId = req.user.id;
    const { groupId } = param;

    return await this.missionService.createMission(
      title,
      content,
      userId,
      groupId,
    );
  }


  @Get(":missionId")
  getMission(
    @Param() param: { missionId: string },
  ) {
    const { missionId } = param;
    return this.missionService.findMission(missionId);
  }

  @Patch(':missionId')
  @UseGuards(AuthGuard())
  async updateGroup(
    @Req() req: { user: TokenPayload },
    @Param() param: { missionId: string; },
    @Body() body: { content: string },
  ) {
    const { missionId } = param;
    const { content } = body;
    if (!missionId) {
      throw new BadRequestException();
    }
    return await this.missionService.updateMission(content, missionId);
  }




}
