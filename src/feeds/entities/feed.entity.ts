import { CommentEntity } from 'src/comments/entities';
import { BaseEntity } from 'src/common/enitty';
import { GroupEntity } from 'src/group/entities';
import { UserEntity } from 'src/user/entities';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('Feeds')
export class FeedEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  groupid: string;

  @ManyToOne(() => GroupEntity, group => group.feed, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  group: GroupEntity[]
 
}
