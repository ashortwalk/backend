import { BaseEntity } from 'src/common/enitty';
import { UserEntity } from 'src/user/entities';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
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

  @Column({ type: 'bigint', default: 0 })
  viewCount: bigint;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @ManyToOne(() => UserEntity, user => user.post, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
