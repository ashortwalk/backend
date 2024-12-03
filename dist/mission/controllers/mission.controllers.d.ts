import { MissionService } from '../services/mission.services';
import { TokenPayload } from 'src/user/types/user.type';
export declare class MissionController {
    private readonly missionService;
    constructor(missionService: MissionService);
    feedGroup(param: any, body: {
        title: string;
        content: string;
    }, req: {
        user: TokenPayload;
    }): Promise<import("../entities/mission.entity").MissionEntity>;
}
