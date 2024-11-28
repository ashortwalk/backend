import { CommentEntity } from 'src/comments/entities';
import { BaseEntity } from 'src/common/entity';
import { UserEntity } from 'src/user/entities';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('Posts')
export class PostEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  content: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  thumbnail: string;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'integer', default: 0 })
  viewCount: number;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @ManyToOne(() => UserEntity, user => user.post, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => CommentEntity, comment => comment.post, { cascade: true })
  comment: CommentEntity[];
}
