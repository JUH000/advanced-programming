"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
let ExamService = class ExamService {
    exams = [];
    create(exam) {
        this.exams.push(exam);
        return {
            message: '시험 정보 등록 완료',
            data: exam,
        };
    }
    findByUser(userId) {
        const results = this.exams.filter(exam => exam.userId === userId);
        return {
            userId,
            exams: results,
        };
    }
    findLatestByUserId(userId) {
        const userExams = this.exams.filter(exam => exam.userId === userId);
        const latest = userExams[userExams.length - 1];
        return latest || null;
    }
};
exports.ExamService = ExamService;
exports.ExamService = ExamService = __decorate([
    (0, common_1.Injectable)()
], ExamService);
//# sourceMappingURL=exam.service.js.map