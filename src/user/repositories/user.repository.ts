import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserType } from '../types/user.type';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.findOneBy({ id });
    return user;
  }

  async findUserByNickname(nickname: string): Promise<UserEntity> {
    const user = await this.findOneBy({ nickname });
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.findOneBy({ email });
  }

  async findByKakaoPassword(password: string): Promise<UserEntity> {
    return await this.findOne({ where: { password, type: 'kakao' } });
  }

  async createUser(
    email: string,
    nickname: string,
    password: string,
    type: UserType,
  ) {
    const user = new UserEntity();
    user.email = email;
    user.nickname = nickname;
    user.password = password;
    user.type = type;
    return await this.save(user);
  }

  async updateUser(id: string, nickname: string) {
    const user = await this.findOneBy({ id });

    if (!user) {
      throw new BadRequestException();
    }
    user.nickname = nickname;
    const updatedUser = await this.save(user);
    delete updatedUser.password;
    return updatedUser;
  }

  async deleteUser(id: string) {
    const user = await this.softRemove({ id });

    if (!user) {
      throw new BadRequestException();
    }
    return true;
  }
}
