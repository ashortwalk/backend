import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../entities';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UserType } from '../types';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.findOneBy({ id });
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.findOneBy({ email });
  }

  async findByKakaoPassword(password: string): Promise<User> {
    return await this.findOne({ where: { password, type: 'kakao' } });
  }

  async createUser(
    email: string,
    nickname: string,
    password: string,
    type: UserType,
  ) {
    const user = new User();
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
