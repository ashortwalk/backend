import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { GroupService } from '../services';
import { CreateGroupDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from 'src/user/types/user.type';
import { GroupEntity } from '../entities';
import { UpdateGroupDto } from '../dto';

@Controller('api/groups')
export class GrpupController {
    constructor(private readonly groupService: GroupService) { }

    @Post()
    @UseGuards(AuthGuard())
    async createGroup(
        @Body() createGroupDto: CreateGroupDto,
        @Req() req: { user: TokenPayload }
    ) {
        const leaderUserId = req.user.id
        const groupName = createGroupDto.groupName;
        const description = createGroupDto.description;
        const tag = createGroupDto.tag;

        return await this.groupService.createGroup(groupName, description, tag, leaderUserId);
    }

    @Get(':groupId')
    getPost(@Param() param: { groupId: string }): Promise<GroupEntity> {
        const { groupId } = param;
        if (!groupId) {
            throw new BadRequestException();
        }
        return this.groupService.findGroup(groupId);
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    async updateGroup(
        @Req() req: { user: TokenPayload },
        @Param() param: { id: string },
        @Body() updateGroupDto: UpdateGroupDto,
    ) {
        const leaderUserId = req.user.id;
        const { id } = param;
        if (!id) {
            throw new BadRequestException();
        }
        return await this.groupService.updateGroup(
            id,
            updateGroupDto.groupName,
            updateGroupDto.description,
            updateGroupDto.tag,
        );
    }

}
