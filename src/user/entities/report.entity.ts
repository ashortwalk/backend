import { BaseEntity } from 'src/common/enitty';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ContentType } from '../types/report.type';

@Entity('Reports')
export class ReportEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar', length: 30 })
  contentType: ContentType;

  @Column({ type: 'varchar' })
  contentId: string;

  @Column({ type: 'varchar' })
  reportTitle: string;

  @Column({ type: 'varchar' })
  reportContent: string;

  @ManyToOne(() => UserEntity, user => user.report, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
