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
exports.NotionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sync_to_notion_dto_1 = require("./dto/sync-to-notion.dto");
const notion_service_1 = require("./notion.service");
let NotionController = class NotionController {
    notionService;
    constructor(notionService) {
        this.notionService = notionService;
    }
    sync(dto) {
        return this.notionService.syncToNotion(dto);
    }
};
exports.NotionController = NotionController;
__decorate([
    (0, common_1.Post)('sync'),
    (0, swagger_1.ApiOperation)({ summary: '확정된 계획을 Notion에 연동' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sync_to_notion_dto_1.SyncToNotionDto]),
    __metadata("design:returntype", void 0)
], NotionController.prototype, "sync", null);
exports.NotionController = NotionController = __decorate([
    (0, swagger_1.ApiTags)('notion'),
    (0, common_1.Controller)('notion'),
    __metadata("design:paramtypes", [notion_service_1.NotionService])
], NotionController);
//# sourceMappingURL=notion.controller.js.map