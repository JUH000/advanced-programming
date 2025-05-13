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
exports.UserPreferenceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserPreferenceService = class UserPreferenceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User ID ${userId} not found`);
        }
        const existing = await this.prisma.studyPreference.findUnique({
            where: { userId: user.id },
        });
        const data = {
            style: dto.style,
            studyDays: dto.studyDays,
            sessionsPerDay: dto.sessionsPerDay,
            user: { connect: { id: user.id } },
        };
        if (existing) {
            return this.prisma.studyPreference.update({
                where: { userId: user.id },
                data,
            });
        }
        else {
            return this.prisma.studyPreference.create({ data });
        }
    }
    async findByUserId(userId) {
        const user = await this.prisma.user.findUnique({
            where: { userId },
            include: { preference: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User ID ${userId} not found`);
        }
        return user.preference;
    }
};
exports.UserPreferenceService = UserPreferenceService;
exports.UserPreferenceService = UserPreferenceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserPreferenceService);
//# sourceMappingURL=user-preference.service.js.map