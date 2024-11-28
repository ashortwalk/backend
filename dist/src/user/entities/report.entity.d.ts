import { BaseEntity } from 'src/common/entity';
import { UserEntity } from './user.entity';
import { ContentType } from '../types/report.type';
export declare class ReportEntity extends BaseEntity {
    userId: string;
    contentType: ContentType;
    contentId: string;
    reportTitle: string;
    reportContent: string;
    user: UserEntity;
}
