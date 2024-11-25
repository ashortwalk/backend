import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from '../dto/create-report.dto';
import { ReportService } from '../services/reports.service';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from '../types/user.type';

@Controller('api/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(AuthGuard())
  createReport(
    @Req() req: { user: TokenPayload },
    @Body() createReportDto: CreateReportDto,
  ) {
    const userId = req.user.id;
    return this.reportService.createReport(userId, createReportDto);
  }

  @Delete(':reportId')
  @UseGuards(AuthGuard())
  async deleteReport(@Req() req, @Param() param: { reportId: string }) {
    const { role } = req.user;

    if (role !== 'admin') {
      throw new BadRequestException();
    }
    const { reportId } = param;
    const authorization = req.headers.authorization;
    return await this.reportService.deleteReport(authorization, reportId);
  }
}
