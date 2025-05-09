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
exports.AiPlannerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const user_preference_service_1 = require("../../user-preference/user-preference.service");
const exam_service_1 = require("../../exam/exam.service");
const notion_service_1 = require("../../notion/notion.service");
let AiPlannerService = class AiPlannerService {
    configService;
    userPreferenceService;
    examService;
    notionService;
    constructor(configService, userPreferenceService, examService, notionService) {
        this.configService = configService;
        this.userPreferenceService = userPreferenceService;
        this.examService = examService;
        this.notionService = notionService;
    }
    async generateStudyPlanByUserId(userId) {
        const preference = await this.userPreferenceService.findByUserId(userId);
        const exam = await this.examService.findLatestByUserId(userId);
        if (!preference || !exam)
            throw new common_1.InternalServerErrorException('필수 정보가 없습니다');
        const prompt = this.createPrompt(exam, preference);
        const hfApiKey = this.configService.get('HF_API_KEY');
        const hfModel = this.configService.get('HF_MODEL');
        try {
            const response = await axios_1.default.post(`https://api-inference.huggingface.co/models/${hfModel}`, { inputs: prompt }, {
                headers: {
                    Authorization: `Bearer ${hfApiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            const rawText = response.data?.[0]?.generated_text || response.data;
            const parsed = JSON.parse(rawText);
            const optimized = this.optimizeResponse(parsed, exam.startDate);
            await this.notionService.saveScheduleToNotion(userId, optimized);
            return optimized;
        }
        catch (err) {
            console.error('[AI 오류]', err);
            throw new common_1.InternalServerErrorException('AI 처리 실패');
        }
    }
    createPrompt(dto, pref) {
        const chapters = dto.chapters
            .map((ch, i) => `Chapter ${i + 1}: "${ch.chapterTitle}", 난이도: ${ch.difficulty}, 분량: ${ch.contentVolume}`)
            .join('\n');
        return [
            '당신은 학습 계획을 세우는 인공지능입니다.',
            '아래 정보를 기반으로 하루 단위 학습 일정을 JSON 형식으로 만들어 주세요.',
            '',
            `[사용자 정보]`,
            `- 학습 스타일: ${pref.style === 'focus' ? '하루 한 과목 집중' : '여러 과목 병행'}`,
            `- 학습 요일: ${pref.studyDays.join(', ')}`,
            `- 하루 학습 세션 수: ${pref.sessionsPerDay}`,
            `- 기상 유형: ${pref.wakeTime === 'morning' ? '오전형(9시 시작)' : '야행성(18시 시작)'}`,
            '',
            '[시험 정보]',
            `- 과목: ${dto.subject}`,
            `- 학습 기간: ${dto.startDate} ~ ${dto.endDate}`,
            `- 중요도: ${dto.importance}/5`,
            '- 챕터 목록:',
            chapters,
            '',
            '규칙:',
            '1. 모든 챕터를 남은 일수에 균등하게 분배하세요.',
            '2. 하루 단위로 "day"를 지정하고, 해당 날짜의 "chapters"를 배열로 제공하세요.',
            '3. 복습 또는 휴식일도 포함되면 좋습니다.',
            '4. 설명 없이 JSON 배열만 출력해 주세요. 백틱(```)은 쓰지 마세요.',
            '',
            '예시 출력:',
            '[',
            '  { "day": 1, "chapters": ["Chapter 1", "Chapter 2"] },',
            '  { "day": 2, "chapters": ["Chapter 3"] }',
            ']',
        ].join('\n');
    }
    optimizeResponse(parsed, startDate) {
        const { format, addDays } = require('date-fns');
        return parsed.map((item, index) => {
            const currentDate = addDays(new Date(startDate), index);
            return {
                date: format(currentDate, 'yyyy-MM-dd'),
                day: item.day || index + 1,
                tasks: item.chapters || [],
            };
        });
    }
};
exports.AiPlannerService = AiPlannerService;
exports.AiPlannerService = AiPlannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_preference_service_1.UserPreferenceService,
        exam_service_1.ExamService,
        notion_service_1.NotionService])
], AiPlannerService);
//# sourceMappingURL=ai-planner.service.js.map