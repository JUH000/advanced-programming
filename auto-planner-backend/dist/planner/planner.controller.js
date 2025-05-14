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
exports.PlannerController = void 0;
const common_1 = require("@nestjs/common");
const planner_service_1 = require("./planner.service");
const confirm_plan_dto_1 = require("./dto/confirm-plan.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const notion_token_store_1 = require("../auth/notion-token.store");
let PlannerController = class PlannerController {
    plannerService;
    constructor(plannerService) {
        this.plannerService = plannerService;
    }
    confirmPlan(id, dto) {
        const token = (0, notion_token_store_1.getToken)(id);
        console.log(`[PLANNER] 불러온 Notion token: ${token}`);
        return this.plannerService.confirmPlan(id, dto);
    }
};
exports.PlannerController = PlannerController;
__decorate([
    (0, common_1.Post)(':id/confirm'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiParam)({ name: 'id', description: '확정할 계획 ID' }),
    (0, swagger_1.ApiOperation)({ summary: '공부 계획 확정 및 Notion 연동 (mock)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, confirm_plan_dto_1.ConfirmPlanDto]),
    __metadata("design:returntype", void 0)
], PlannerController.prototype, "confirmPlan", null);
exports.PlannerController = PlannerController = __decorate([
    (0, swagger_1.ApiTags)('planner'),
    (0, common_1.Controller)('planner'),
    __metadata("design:paramtypes", [planner_service_1.PlannerService])
], PlannerController);
//# sourceMappingURL=planner.controller.js.map