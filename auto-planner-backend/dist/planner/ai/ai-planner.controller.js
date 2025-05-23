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
exports.AiPlannerController = void 0;
const common_1 = require("@nestjs/common");
const ai_planner_service_1 = require("./ai-planner.service");
const ai_planner_dto_1 = require("./dto/ai-planner.dto");
const swagger_1 = require("@nestjs/swagger");
let AiPlannerController = class AiPlannerController {
    aiPlannerService;
    constructor(aiPlannerService) {
        this.aiPlannerService = aiPlannerService;
    }
    async generatePlan(body) {
        return this.aiPlannerService.generateStudyPlanByUserId(body.userId);
    }
};
exports.AiPlannerController = AiPlannerController;
__decorate([
    (0, common_1.Post)('/generate'),
    (0, swagger_1.ApiOperation)({
        summary: 'GPT 기반 학습 계획 생성',
        description: `사용자의 시험 정보 및 preference를 기반으로 LLM(FastAPI) 또는 내부 rule engine을 활용하여 학습 계획을 생성합니다.
  LLM 호출이 실패하거나 비활성화된 경우, 내부 TypeScript 로직으로 fallback 처리됩니다.`,
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['userId'],
            properties: {
                userId: {
                    type: 'string',
                    example: 'user123',
                    description: '사용자 고유 ID',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: `생성된 학습 계획 목록 (Notion에 동기화됨). 
  응답은 JSON 배열이며, 각 항목은 { subject, date, content } 형식입니다.`,
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    subject: { type: 'string', example: '의료기기인허가' },
                    startDate: { type: 'string', example: '2025-06-01' },
                    endDate: { type: 'string', example: '2025-06-15' },
                    dailyPlan: {
                        type: 'array',
                        items: { type: 'string', example: '6/1: Chapter 7 (p.1-10)' },
                    },
                    databaseId: { type: 'string', example: 'notion-db-id-abc123' },
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_planner_dto_1.AiGeneratePlanDto]),
    __metadata("design:returntype", Promise)
], AiPlannerController.prototype, "generatePlan", null);
exports.AiPlannerController = AiPlannerController = __decorate([
    (0, swagger_1.ApiTags)('ai-plan'),
    (0, common_1.Controller)('ai-plan'),
    __metadata("design:paramtypes", [ai_planner_service_1.AiPlannerService])
], AiPlannerController);
//# sourceMappingURL=ai-planner.controller.js.map