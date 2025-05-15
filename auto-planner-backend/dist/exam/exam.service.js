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
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExamService = class ExamService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(exam) {
        const user = await this.prisma.user.findUnique({
            where: { userId: exam.userId },
        });
        if (!user) {
            throw new Error(`User with userId '${exam.userId}' not found`);
        }
        const created = await this.prisma.exam.create({
            data: {
                subject: exam.subject,
                startDate: new Date(exam.startDate),
                endDate: new Date(exam.endDate),
                importance: exam.importance,
                userId: user.id,
                chapters: {
                    create: exam.chapters.map((ch) => ({
                        chapterTitle: ch.chapterTitle,
                        difficulty: ch.difficulty,
                        contentVolume: ch.contentVolume,
                    })),
                },
            },
            include: { chapters: true },
        });
        return {
            message: '시험 정보 등록 완료',
            data: created,
        };
    }
    async findByUser(userId) {
        const user = await this.prisma.user.findUnique({ where: { userId } });
        if (!user)
            return { userId, exams: [] };
        const exams = await this.prisma.exam.findMany({
            where: { userId: user.id },
            include: { chapters: true },
        });
        return { userId, exams };
    }
    async findLatestByUserId(userId) {
        const user = await this.prisma.user.findUnique({ where: { userId } });
        if (!user)
            return null;
        return await this.prisma.exam.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            include: { chapters: true },
        });
    }
};
exports.ExamService = ExamService;
exports.ExamService = ExamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamService);
//# sourceMappingURL=exam.service.js.map