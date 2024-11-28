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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const create_report_dto_1 = require("../dto/create-report.dto");
const reports_service_1 = require("../services/reports.service");
const passport_1 = require("@nestjs/passport");
const auth_guard_1 = require("../guard/auth.guard");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    getReports(query) {
        const { page } = query;
        return this.reportService.findReports(page);
    }
    getReportsCount() {
        return this.reportService.countReports();
    }
    createReport(req, createReportDto) {
        const userId = req.user.id;
        return this.reportService.createReport(userId, createReportDto);
    }
    async deleteReport(req, param) {
        const { reportId } = param;
        const authorization = req.headers.authorization;
        return await this.reportService.deleteReport(authorization, reportId);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, auth_guard_1.Roles)('admin'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getReports", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, auth_guard_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getReportsCount", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_report_dto_1.CreateReportDto]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "createReport", null);
__decorate([
    (0, common_1.Delete)(':reportId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, auth_guard_1.Roles)('admin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "deleteReport", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)('api/reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map