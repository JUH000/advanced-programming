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
exports.ExamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_exam_dto_1 = require("./dto/create-exam.dto");
const exam_service_1 = require("./exam.service");
let ExamController = class ExamController {
    examService;
    constructor(examService) {
        this.examService = examService;
    }
    create(createExamDto) {
        return this.examService.create(createExamDto);
    }
    findByUser(userId) {
        return this.examService.findByUser(userId);
    }
};
exports.ExamController = ExamController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '시험 정보 등록' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exam_dto_1.CreateExamDto]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: '사용자의 시험 정보 조회' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: '사용자 ID' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "findByUser", null);
exports.ExamController = ExamController = __decorate([
    (0, swagger_1.ApiTags)('exam'),
    (0, common_1.Controller)('exam'),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
//# sourceMappingURL=exam.controller.js.map