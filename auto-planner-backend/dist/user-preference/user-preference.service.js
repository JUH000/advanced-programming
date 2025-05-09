"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPreferenceService = void 0;
const common_1 = require("@nestjs/common");
let UserPreferenceService = class UserPreferenceService {
    store = new Map();
    save(userId, dto) {
        this.store.set(userId, dto);
        return { message: '저장 완료', userId, preference: dto };
    }
    findByUserId(userId) {
        const data = this.store.get(userId);
        return data ? data : null;
    }
};
exports.UserPreferenceService = UserPreferenceService;
exports.UserPreferenceService = UserPreferenceService = __decorate([
    (0, common_1.Injectable)()
], UserPreferenceService);
//# sourceMappingURL=user-preference.service.js.map