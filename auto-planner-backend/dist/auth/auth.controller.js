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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const swagger_1 = require("@nestjs/swagger");
const axios_1 = require("axios");
const notion_token_store_1 = require("./notion-token.store");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    login(dto) {
        return this.authService.login(dto);
    }
    redirectToNotion(userId, res) {
        const clientId = process.env.NOTION_CLIENT_ID;
        const redirectUri = process.env.NOTION_REDIRECT_URI;
        const state = `user-${userId}`;
        const notionOAuthUrl = `https://api.notion.com/v1/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&owner=user`;
        console.log(notionOAuthUrl);
        return res.send(notionOAuthUrl);
    }
    async handleNotionCallback(code, userId, res) {
        const clientId = process.env.NOTION_CLIENT_ID;
        const clientSecret = process.env.NOTION_CLIENT_SECRET;
        const redirectUri = process.env.NOTION_REDIRECT_URI;
        try {
            const tokenResponse = await axios_1.default.post('https://api.notion.com/v1/oauth/token', {
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
            }, {
                auth: {
                    username: clientId,
                    password: clientSecret,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const access_token = tokenResponse.data.access_token;
            const workspace_id = tokenResponse.data.workspace_id;
            (0, notion_token_store_1.saveToken)(userId, access_token);
            console.log(`[✅ Notion 연동 완료] userId: ${userId}, token: ${access_token}`);
            return res.send('Notion 연동이 완료되었습니다! 이 창은 닫아도 됩니다.');
        }
        catch (error) {
            console.error('❌ Notion 연동 실패:', error.response?.data || error.message);
            return res.status(500).send('Notion 연동 중 오류가 발생했습니다.');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '로그인 및 JWT 발급' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('notion/redirect'),
    (0, swagger_1.ApiOperation)({ summary: 'Notion OAuth 인증 리다이렉트' }),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "redirectToNotion", null);
__decorate([
    (0, common_1.Get)('notion/callback'),
    (0, swagger_1.ApiOperation)({ summary: 'Notion OAuth 콜백 처리' }),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleNotionCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map