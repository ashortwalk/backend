import { Column, Entity, OneToMany } from "typeorm";
import { MemberEntity } from "./member.entity";
import { BaseEntity } from "src/common/enitty";

@Entity('Groups')
export class GroupEntity extends BaseEntity {
    @Column({ type: "varchar" })
    leaderUserId: string;

    @Column({ type: "varchar" })
    groupName: string;

    @Column({ type: "varchar", nullable: true })
    description: string;

    @Column({ type: "varchar", nullable: true })
    tag: string;

    @OneToMany(() => MemberEntity, member => member.group, { cascade: true })
    member: MemberEntity[];
}

