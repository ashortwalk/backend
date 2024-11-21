import { BaseEntity } from 'src/common/enitty';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { UserRole, UserType } from '../types';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
@Unique(['email', 'nickname'])
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 30, default: 'user' })
  role: UserRole;

  @Column({ type: 'varchar', length: 30, default: 'local' })
  type: UserType;

  @OneToMany(() => Post, post => post.user, { cascade: true })
  post: Post[];
}
