import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportRepository } from '../repositories/reports.repository';
import { CreateReportDto } from '../dto/create-report.dto';
import { ReportEntity } from '../entities';
import { HttpService } from '@nestjs/axios';

import { CommentsRepository } from 'src/comments/repositories';
import { PostRepository } from 'src/posts/repositories/posts.repository';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportsRepository: ReportRepository,
    private readonly httpService: HttpService,
    private readonly commentsRepository: CommentsRepository,
    private readonly postRepository: PostRepository,
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
    if (contentType == 'posts') {
      this.postRepository.deletePostById(contentId);
    } else if (contentType == 'comments') {
      this.commentsRepository.deleteComment(contentId);
    }
    return await this.reportsRepository.deleteReport(reportId);
  }

  countReports() {
    return this.reportsRepository.countReports();
  }
}
