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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
let ReportRepository = class ReportRepository extends typeorm_2.Repository {
    constructor(repo, entityManager) {
        super(repo.target, repo.manager, repo.queryRunner);
        this.repo = repo;
        this.entityManager = entityManager;
    }
    async findReports(page) {
        const limit = 3;
        return await this.find({ skip: (page - 1) * limit, take: limit });
    }
    async createReport(userId, createReportDto) {
        const report = new entities_1.ReportEntity();
        const { contentId, contentType, reportTitle, reportContent } = createReportDto;
        report.userId = userId;
        report.contentId = contentId;
        report.contentType = contentType;
        report.reportTitle = reportTitle;
        report.reportContent = reportContent;
        return await this.save(report);
    }
    async findReport(reportId) {
        const report = await this.findOneBy({ id: reportId });
        return report;
    }
    async deleteReport(reportId) {
        const isDeleted = await this.softRemove({ id: reportId });
        if (!isDeleted) {
            throw new common_1.BadRequestException();
        }
        return true;
    }
    async countReports() {
        return await this.count();
    }
};
exports.ReportRepository = ReportRepository;
exports.ReportRepository = ReportRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ReportEntity)),
    __param(1, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.EntityManager])
], ReportRepository);
//# sourceMappingURL=reports.repository.js.map