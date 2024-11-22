import { BaseEntity } from 'src/common/enitty';
import { UserEntity } from 'src/user/entities';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class CommentEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  content: string;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @ManyToOne(() => UserEntity, user => user.comment, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
