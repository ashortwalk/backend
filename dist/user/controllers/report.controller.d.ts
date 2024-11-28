import { CreateReportDto } from '../dto/create-report.dto';
import { ReportService } from '../services/reports.service';
import { TokenPayload } from '../types/user.type';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getReports(query: any): Promise<import("../entities").ReportEntity[]>;
    getReportsCount(): Promise<number>;
    createReport(req: {
        user: TokenPayload;
    }, createReportDto: CreateReportDto): Promise<import("../entities").ReportEntity>;
    deleteReport(req: any, param: {
        reportId: string;
    }): Promise<boolean>;
}
