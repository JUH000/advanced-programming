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
exports.NotionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@notionhq/client");
const notion_token_store_1 = require("../auth/notion-token.store");
let NotionService = class NotionService {
    configService;
    defaultDatabaseId;
    constructor(configService) {
        this.configService = configService;
        this.defaultDatabaseId = this.configService.get('DATABASE_ID') ?? 'default-id';
    }
    getClientForUser(userId) {
        const userToken = (0, notion_token_store_1.getToken)(userId);
        if (!userToken) {
            throw new Error(`❌ Notion token not found for user ${userId}`);
        }
        return new client_1.Client({ auth: userToken });
    }
    async addPlanEntry(data) {
        const notion = this.getClientForUser(data.userId);
        return await notion.pages.create({
            parent: { database_id: data.databaseId },
            properties: {
                Subject: {
                    title: [{ text: { content: data.subject } }],
                },
                'User ID': {
                    rich_text: [{ text: { content: data.userId } }],
                },
                Date: {
                    date: { start: data.date },
                },
                Content: {
                    rich_text: [{ text: { content: data.content } }],
                },
            },
        });
    }
    async syncToNotion(dto) {
        for (const entry of dto.dailyPlan) {
            const [date, content] = entry.split(':').map((v) => v.trim());
            const formattedDate = `2025-${date.replace('/', '-')}`;
            await this.addPlanEntry({
                userId: dto.userId,
                subject: dto.subject,
                date: formattedDate,
                content,
                databaseId: dto.databaseId,
            });
        }
        return {
            message: '📌 노션 연동 완료',
            count: dto.dailyPlan.length,
        };
    }
};
exports.NotionService = NotionService;
exports.NotionService = NotionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotionService);
//# sourceMappingURL=notion.service.js.map