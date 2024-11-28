import { UserEntity } from '../entities';
import { EntityManager, Repository } from 'typeorm';
import { UserType } from '../types/user.type';
export declare class UserRepository extends Repository<UserEntity> {
    private readonly repo;
    private readonly entityManager;
    constructor(repo: Repository<UserEntity>, entityManager: EntityManager);
    findUserById(id: string): Promise<UserEntity>;
    findUserByNickname(nickname: string): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    findByKakaoPassword(password: string): Promise<UserEntity>;
    createUser(email: string, nickname: string, password: string, type: UserType): Promise<UserEntity>;
    updateUser(id: string, nickname: string): Promise<UserEntity>;
    deleteUser(id: string): Promise<boolean>;
}
