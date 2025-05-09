"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const ai_planner_service_1 = require("./ai-planner.service");
const ai_planner_controller_1 = require("./ai-planner.controller");
const user_preference_module_1 = require("../../user-preference/user-preference.module");
const exam_module_1 = require("../../exam/exam.module");
const notion_module_1 = require("../../notion/notion.module");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            user_preference_module_1.UserPreferenceModule,
            exam_module_1.ExamModule,
            notion_module_1.NotionModule,
        ],
        controllers: [ai_planner_controller_1.AiPlannerController],
        providers: [ai_planner_service_1.AiPlannerService],
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map