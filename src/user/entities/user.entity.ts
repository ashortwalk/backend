import { BaseEntity } from 'src/common/enitty';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { UserRole, UserType } from '../types/user.type';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CommentEntity } from 'src/comments/entities';

@Entity()
@Unique(['email', 'nickname'])
export class UserEntity extends BaseEntity {
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

  @OneToMany(() => PostEntity, post => post.user, { cascade: true })
  post: PostEntity[];

  @OneToMany(() => CommentEntity, comment => comment.user, { cascade: true })
  comment: CommentEntity[];
}
