import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from '../dto/create-report.dto';
import { ReportService } from '../services/reports.service';
import { AuthGuard } from '@nestjs/passport';
import { TokenPayload } from '../types/user.type';
import { Roles } from '../guard/auth.guard';

@Controller('api/reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @UseGuards(AuthGuard())
  @Roles('admin')
  getReports(@Query() query) {
    const { page } = query;
    return this.reportService.findReports(page);
  }

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
  @Roles('admin')
  async deleteReport(@Req() req, @Param() param: { reportId: string }) {
    const { reportId } = param;
    const authorization = req.headers.authorization;
    return await this.reportService.deleteReport(authorization, reportId);
  }
}
