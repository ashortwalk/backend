import { ContentType } from '../types/report.type';
export declare class CreateReportDto {
    readonly contentType: ContentType;
    readonly contentId: string;
    readonly reportTitle: string;
    readonly reportContent: string;
}
