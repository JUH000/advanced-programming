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
exports.ConfirmPlanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ConfirmPlanDto {
    userId;
    subject;
    startDate;
    endDate;
    dailyPlan;
    databaseId;
}
exports.ConfirmPlanDto = ConfirmPlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '202255179' }),
    __metadata("design:type", String)
], ConfirmPlanDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '고급 프로그래밍' }),
    __metadata("design:type", String)
], ConfirmPlanDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-01' }),
    __metadata("design:type", String)
], ConfirmPlanDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-15' }),
    __metadata("design:type", String)
], ConfirmPlanDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6/1: Chapter 1', '6/2: Chapter 2'] }),
    __metadata("design:type", Array)
], ConfirmPlanDto.prototype, "dailyPlan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1f462039491480a48452f3bd7436ffd2" }),
    __metadata("design:type", String)
], ConfirmPlanDto.prototype, "databaseId", void 0);
//# sourceMappingURL=confirm-plan.dto.js.map