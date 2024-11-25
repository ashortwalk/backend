import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from '../entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CreateReportDto } from '../dto/create-report.dto';

@Injectable()
export class ReportRepository extends Repository<ReportEntity> {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly repo: Repository<ReportEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createReport(
    userId: string,
    createReportDto: CreateReportDto,
  ): Promise<ReportEntity> {
    const report = new ReportEntity();

    const { contentId, contentType, reportTitle, reportContent } =
      createReportDto;
    report.userId = userId;
    report.contentId = contentId;
    report.contentType = contentType;
    report.reportTitle = reportTitle;
    report.reportContent = reportContent;

    return await this.save(report);
  }
  async findReport(reportId: string) {
    const report = await this.findOneBy({ id: reportId });
    return report;
  }

  async deleteReport(reportId: string): Promise<boolean> {
    const isDeleted = await this.softRemove({ id: reportId });
    if (!isDeleted) {
      throw new BadRequestException();
    }
    return true;
  }
}
