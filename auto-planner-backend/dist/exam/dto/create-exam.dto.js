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
exports.CreateExamDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const chapter_info_dto_1 = require("../../exam/dto/chapter-info.dto");
class CreateExamDto {
    subject;
    startDate;
    endDate;
    importance;
    chapters;
    userId;
}
exports.CreateExamDto = CreateExamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '수학', description: '시험 과목' }),
    __metadata("design:type", String)
], CreateExamDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-01' }),
    __metadata("design:type", String)
], CreateExamDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-06-15' }),
    __metadata("design:type", String)
], CreateExamDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: '중요도 (1~5)' }),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "importance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [chapter_info_dto_1.ChapterInfoDto],
        description: '챕터 정보 리스트',
    }),
    __metadata("design:type", Array)
], CreateExamDto.prototype, "chapters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user123', description: '등록자 ID' }),
    __metadata("design:type", String)
], CreateExamDto.prototype, "userId", void 0);
//# sourceMappingURL=create-exam.dto.js.map