import { BaseEntity } from 'src/common/enitty';
import { Column, Entity } from 'typeorm';
import { UserRole, UserType } from '../types';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 30, default: 'user' })
  role: UserRole;

  @Column({ type: 'varchar', length: 30, default: 'local' })
  type: UserType;
}
