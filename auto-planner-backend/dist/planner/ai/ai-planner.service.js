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
const user_preference_service_1 = require("../../user-preference/user-preference.service");
const exam_service_1 = require("../../exam/exam.service");
const llm_client_service_1 = require("./llm-client.service");
let AiPlannerService = class AiPlannerService {
    configService;
    userPreferenceService;
    examService;
    llmClient;
    constructor(configService, userPreferenceService, examService, llmClient) {
        this.configService = configService;
        this.userPreferenceService = userPreferenceService;
        this.examService = examService;
        this.llmClient = llmClient;
    }
    async generateStudyPlanByUserId(userId) {
        const preference = await this.userPreferenceService.findByUserId(userId);
        const { exams } = await this.examService.findByUser(userId);
        if (!preference || !exams || exams.length === 0) {
            throw new common_1.InternalServerErrorException('❌ 유저 정보 또는 시험 데이터가 부족합니다.');
        }
        const mergedSubjects = this.mergeSubjects(exams);
        const prompt = this.createPrompt(mergedSubjects, preference);
        const parsed = await this.llmClient.generate(prompt);
        if (!Array.isArray(parsed)) {
            console.error('❌ LLM 응답이 배열이 아님:', parsed);
            throw new common_1.InternalServerErrorException('LLM 응답이 JSON 배열 형식이 아닙니다.');
        }
        return parsed;
    }
    mergeSubjects(exams) {
        const grouped = {};
        for (const exam of exams) {
            const key = exam.subject;
            if (!grouped[key]) {
                grouped[key] = {
                    subject: exam.subject,
                    startDate: exam.startDate,
                    endDate: exam.endDate,
                    chapters: [...exam.chapters],
                };
            }
            else {
                grouped[key].startDate = new Date(exam.startDate) < new Date(grouped[key].startDate)
                    ? exam.startDate
                    : grouped[key].startDate;
                grouped[key].endDate = new Date(exam.endDate) > new Date(grouped[key].endDate)
                    ? exam.endDate
                    : grouped[key].endDate;
                grouped[key].chapters.push(...exam.chapters);
            }
        }
        return Object.values(grouped);
    }
    createPrompt(subjects, pref) {
        const lines = [
            "You are an assistant that returns ONLY a valid JSON array. No explanations.",
            "",
            "Each object must include:",
            "- subject",
            "- startDate",
            "- endDate",
            '- dailyPlan (list of study strings in the format: \"MM/DD: 과목명 - 챕터명 (p.xx-yy)\")',
            "",
            "Use contentVolume of chapters to estimate page range. For example, if contentVolume = 5, you might output (p.1-5). Use 5 pages per unit volume.",
            "",
            "Study preferences:",
            "- Style: Multi",
            "- Study Days: 월, 화, 수, 목, 금",
            "- Sessions per Day: 4",
            "",
            "Exams:",
            "- Subject: 의료기기인허가",
            "  Period: 2025-05-23 ~ 2025-06-16",
            "  Chapters:",
            "    - Chapter 1: 의료기기관련기준규격 (contentVolume: 6)",
            "    - Chapter 2: 전자파안전 (contentVolume: 4)",
            "    - Chapter 3: GMP (contentVolume: 5)",
            "    - Chapter 4: GMP 기준 해설 (contentVolume: 6)",
            "",
            "- Subject: 시계열분석",
            "  Period: 2025-05-23 ~ 2025-06-11",
            "  Chapters:",
            "    - Chapter 1: 시계열 데이터의 개념과 특성 (contentVolume: 5)",
            "    - Chapter 2: 자기상관과 정상성 (contentVolume: 6)",
            "    - Chapter 3: AR, MA, ARMA 모델 (contentVolume: 5)",
            "    - Chapter 4: ARIMA 및 차분 기법 (contentVolume: 5)",
            "    - Chapter 5: 계절성, 트렌드, 예측 (contentVolume: 5)",
            "",
            "Return a JSON array like this (with real content):",
            "[",
            "  {",
            '    "subject": "의료기기인허가",',
            '    "startDate": "2025-05-23",',
            '    "endDate": "2025-06-16",',
            '    "dailyPlan": [',
            '      "6/1: 의료기기인허가 - 의료기기관련기준규격 (p.1-6)",',
            '      "6/2: 의료기기인허가 - 전자파안전 (p.7-10)"',
            "    ]",
            "  },",
            "  {",
            '    "subject": "시계열분석",',
            '    "startDate": "2025-05-23",',
            '    "endDate": "2025-06-11",',
            '    "dailyPlan": [',
            '      "6/1: 시계열분석 - 시계열 데이터의 개념과 특성 (p.1-5)"',
            "    ]",
            "  }",
            "]"
        ];
        for (const subj of subjects) {
            const chapters = subj.chapters.map((ch, i) => {
                const parts = [`Chapter ${i + 1}: ${ch.chapterTitle}`];
                if (ch.contentVolume)
                    parts.push(`(${ch.contentVolume} units)`);
                if (ch.difficulty)
                    parts.push(`난이도: ${ch.difficulty}`);
                return parts.join(' ');
            }).join(', ');
            lines.push(`- Subject: ${subj.subject}`, `  Period: ${new Date(subj.startDate).toDateString()} ~ ${new Date(subj.endDate).toDateString()}`, `  Chapters: ${chapters}`, "");
        }
        lines.push("Now generate the full JSON array based on the exams above.");
        return lines.join('\n');
    }
};
exports.AiPlannerService = AiPlannerService;
exports.AiPlannerService = AiPlannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_preference_service_1.UserPreferenceService,
        exam_service_1.ExamService,
        llm_client_service_1.LLMClientService])
], AiPlannerService);
//# sourceMappingURL=ai-planner.service.js.map