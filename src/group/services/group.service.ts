import {
    Injectable,
} from '@nestjs/common';
import { GroupRepository } from '../repositories';

@Injectable()
export class GroupService {
    constructor(
        private readonly groupRepository: GroupRepository,
    ) { }

    async createGroup(
        groupName: string,
        description: string,
        tag: string,
        leaderUserId: string,
    ) {
        const result = await this.groupRepository.createGroup(
            groupName,
            description,
            tag,
            leaderUserId,
        );

    }

    async findGroup(id: string) {
        const group = await this.groupRepository.findGroupById(id);
        return group;
    }

    async updateGroup(id: string, groupName: string, description: string, tag: string) {
        console.log("서비스호출되나");
        return await this.groupRepository.updateGroup(id, groupName, description, tag);
    }

    async deleteGroup(id: string) {
        return await this.groupRepository.deleteGroup(id);
    }

    async findGroups(page: number) {
        const groups = await this.groupRepository.findGroups(page);
        return groups;
    }

}
