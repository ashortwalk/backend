import { BaseEntity } from 'src/common/enitty';
import { PostEntity } from 'src/posts/entities';
import { UserEntity } from 'src/user/entities';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('Comments')
export class CommentEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  content: string;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  postId: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @ManyToOne(() => UserEntity, user => user.comment, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => PostEntity, post => post.comment, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post: PostEntity;
}
