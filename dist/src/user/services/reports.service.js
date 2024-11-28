"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const reports_repository_1 = require("../repositories/reports.repository");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let ReportService = class ReportService {
    constructor(reportsRepository, httpService) {
        this.reportsRepository = reportsRepository;
        this.httpService = httpService;
    }
    async findReports(page) {
        return await this.reportsRepository.findReports(page);
    }
    async createReport(userId, createReportDto) {
        return await this.reportsRepository.createReport(userId, createReportDto);
    }
    async deleteReport(authorization, reportId) {
        const report = await this.reportsRepository.findReport(reportId);
        if (!report) {
            throw new common_1.BadRequestException();
        }
        const { contentType, contentId } = report;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`http://127.0.0.1:8000/api/${contentType}/${contentId}`, {
                headers: {
                    Authorization: authorization,
                    'Content-Type': 'application/json',
                },
            }));
            if (response.status >= 300) {
                throw new common_1.BadRequestException();
            }
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException();
        }
        return await this.reportsRepository.deleteReport(reportId);
    }
    countReports() {
        return this.reportsRepository.countReports();
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reports_repository_1.ReportRepository,
        axios_1.HttpService])
], ReportService);
//# sourceMappingURL=reports.service.js.map