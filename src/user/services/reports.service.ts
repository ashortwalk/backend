import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ReportRepository } from '../repositories/reports.repository';
import { CreateReportDto } from '../dto/create-report.dto';
import { ReportEntity } from '../entities';
import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportsRepository: ReportRepository,
    private readonly httpService: HttpService,
  ) {}

  async findReports(page: number) {
    return await this.reportsRepository.findReports(page);
  }

  async createReport(
    userId: string,
    createReportDto: CreateReportDto,
  ): Promise<ReportEntity> {
    return await this.reportsRepository.createReport(userId, createReportDto);
  }

  async deleteReport(
    authorization: string,
    reportId: string,
  ): Promise<boolean> {
    const report = await this.reportsRepository.findReport(reportId);

    if (!report) {
      throw new BadRequestException();
    }
    const { contentType, contentId } = report;

    try {
      const response = await firstValueFrom(
        this.httpService.delete(
          `https://shortwalk-f3byftbfe4czehcg.koreacentral-01.azurewebsites.net/api/${contentType}/${contentId}`,
          {
            headers: {
              Authorization: authorization,
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      if (response.status >= 300) {
        throw new BadRequestException();
      }
    } catch (err) {
      throw new InternalServerErrorException();
    }
    return await this.reportsRepository.deleteReport(reportId);
  }

  countReports() {
    return this.reportsRepository.countReports();
  }
}
