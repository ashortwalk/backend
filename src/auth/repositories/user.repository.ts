import { Injectable } from '@nestjs/common';
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

  async findByEmail(email: string) {
    return this.findOneBy({ email });
  }

  async findByKakaoPassword(password: string) {
    return this.findOne({ where: { password, type: 'kakao' } });
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
    return this.save(user);
  }
}
