import { ReportEntity } from '../entities';
import { EntityManager, Repository } from 'typeorm';
import { CreateReportDto } from '../dto/create-report.dto';
export declare class ReportRepository extends Repository<ReportEntity> {
    private readonly repo;
    private readonly entityManager;
    constructor(repo: Repository<ReportEntity>, entityManager: EntityManager);
    findReports(page: number): Promise<ReportEntity[]>;
    createReport(userId: string, createReportDto: CreateReportDto): Promise<ReportEntity>;
    findReport(reportId: string): Promise<ReportEntity>;
    deleteReport(reportId: string): Promise<boolean>;
    countReports(): Promise<number>;
}
