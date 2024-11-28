import { BaseEntity } from 'src/common/entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole, UserType } from '../types/user.type';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CommentEntity } from 'src/comments/entities';
import { ReportEntity } from './report.entity';

@Entity('Users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 30, default: 'user' })
  role: UserRole;

  @Column({ type: 'varchar', length: 30, default: 'email' })
  type: UserType;

  @OneToMany(() => PostEntity, post => post.user, { cascade: true })
  post: PostEntity[];

  @OneToMany(() => CommentEntity, comment => comment.user, { cascade: true })
  comment: CommentEntity[];

  @OneToMany(() => ReportEntity, report => report.user, { cascade: true })
  report: ReportEntity[];
}
