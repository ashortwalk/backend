import { BaseEntity, Column, ManyToOne } from "typeorm";
import { GroupEntity } from "./group.entity";

export class MemberEntity extends BaseEntity {
    @Column({ type: "varchar" })
    groupId: string;

    @Column({ type: "varchar" })
    userId: string;

    @ManyToOne(() => GroupEntity, group => group.member, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    group: GroupEntity;
}