import { ReportRepository } from '../repositories/reports.repository';
import { CreateReportDto } from '../dto/create-report.dto';
import { ReportEntity } from '../entities';
import { HttpService } from '@nestjs/axios';
export declare class ReportService {
    private readonly reportsRepository;
    private readonly httpService;
    constructor(reportsRepository: ReportRepository, httpService: HttpService);
    findReports(page: number): Promise<ReportEntity[]>;
    createReport(userId: string, createReportDto: CreateReportDto): Promise<ReportEntity>;
    deleteReport(authorization: string, reportId: string): Promise<boolean>;
    countReports(): Promise<number>;
}
