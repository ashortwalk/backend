import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from '../entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CreateReportDto } from '../dto/create-report.dto';

@Injectable()
export class UserRepository extends Repository<ReportEntity> {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly repo: Repository<ReportEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createReport(createReportDto: CreateReportDto): Promise<ReportEntity> {
    const report = new ReportEntity();

    const { contentId, contentType, reportTitle, reportContent } =
      createReportDto;
    report.contentId = contentId;
    report.contentType = contentType;
    report.reportTitle = reportTitle;
    report.reportContent = reportContent;

    return await this.save(report);
  }

  async deleteReport(reportId: string): Promise<boolean> {
    const report = await this.softRemove({ id: reportId });
    if (!report) {
      throw new BadRequestException();
    }
    return true;
  }
}
