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
exports.GeneratePlanDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const chapter_info_dto_1 = require("../../exam/dto/chapter-info.dto");
class GeneratePlanDto {
    userId;
    subject;
    startDate;
    endDate;
    importance;
    chapters;
    studyPreference;
}
exports.GeneratePlanDto = GeneratePlanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user123' }),
    __metadata("design:type", String)
], GeneratePlanDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '수학' }),
    __metadata("design:type", String)
], GeneratePlanDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-01' }),
    __metadata("design:type", String)
], GeneratePlanDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-15' }),
    __metadata("design:type", String)
], GeneratePlanDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4 }),
    __metadata("design:type", Number)
], GeneratePlanDto.prototype, "importance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [chapter_info_dto_1.ChapterInfoDto] }),
    __metadata("design:type", Array)
], GeneratePlanDto.prototype, "chapters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '집중 잘 되는 아침형' }),
    __metadata("design:type", String)
], GeneratePlanDto.prototype, "studyPreference", void 0);
//# sourceMappingURL=generate-plan.dto.js.map