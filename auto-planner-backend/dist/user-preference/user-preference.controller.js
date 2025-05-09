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
exports.UserPreferenceController = void 0;
const common_1 = require("@nestjs/common");
const user_preference_service_1 = require("./user-preference.service");
const user_preference_dto_1 = require("./dto/user-preference.dto");
let UserPreferenceController = class UserPreferenceController {
    userPreferenceService;
    constructor(userPreferenceService) {
        this.userPreferenceService = userPreferenceService;
    }
    savePreference(userId, dto) {
        return this.userPreferenceService.save(userId, dto);
    }
    getPreference(userId) {
        return this.userPreferenceService.findByUserId(userId);
    }
};
exports.UserPreferenceController = UserPreferenceController;
__decorate([
    (0, common_1.Post)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_preference_dto_1.UserPreferenceDto]),
    __metadata("design:returntype", void 0)
], UserPreferenceController.prototype, "savePreference", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserPreferenceController.prototype, "getPreference", null);
exports.UserPreferenceController = UserPreferenceController = __decorate([
    (0, common_1.Controller)('user-preference'),
    __metadata("design:paramtypes", [user_preference_service_1.UserPreferenceService])
], UserPreferenceController);
//# sourceMappingURL=user-preference.controller.js.map