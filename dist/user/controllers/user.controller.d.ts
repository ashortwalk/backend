import { UserService } from '../services';
import { UpdateUserDto } from '../dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateUser(req: any, id: string, updateUserDto: UpdateUserDto): Promise<import("../entities").UserEntity>;
    deleteUser(req: any, id: string): Promise<boolean>;
    getUser(req: any): Promise<import("../entities").UserEntity>;
}
