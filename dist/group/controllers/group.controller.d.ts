import { GroupService } from '../services';
import { CreateGroupDto } from '../dto';
import { TokenPayload } from 'src/user/types/user.type';
import { GroupEntity } from '../entities';
import { UpdateGroupDto } from '../dto';
export declare class GrpupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    countTotalPages(): Promise<number>;
    myGroups(req: {
        user: TokenPayload;
    }): Promise<GroupEntity[]>;
    createGroup(createGroupDto: CreateGroupDto, req: {
        user: TokenPayload;
    }): Promise<GroupEntity>;
    getPost(param: {
        groupId: string;
    }): Promise<GroupEntity>;
    updateGroup(req: {
        user: TokenPayload;
    }, param: {
        id: string;
    }, updateGroupDto: UpdateGroupDto): Promise<GroupEntity>;
    deleteUser(req: any, id: string): Promise<boolean>;
    getGroups(query: {
        page: number;
    }): Promise<GroupEntity[]>;
    deleteGroupByName(groupName: string): Promise<boolean>;
}
