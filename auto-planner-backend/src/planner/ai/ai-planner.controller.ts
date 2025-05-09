import { Controller, Post, Body } from '@nestjs/common';
import { AiPlannerService } from './ai-planner.service';
import { AiGeneratePlanDto } from './dto/ai-planner.dto'; // 사용자 입력 DTO
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('ai-plan') // Swagger 문서 그룹 이름
@Controller('ai-plan') // 실제 라우트 경로: /ai-plan
export class AiPlannerController {
  constructor(private readonly aiPlannerService: AiPlannerService) {}

  @Post('/generate')
  @ApiOperation({ summary: 'GPT 기반 학습 계획 생성' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['userId'],
      properties: {
        userId: {
          type: 'string',
          example: 'user123',
          description: '사용자 ID',
        },
      },
    },
  })
  async generatePlan(@Body() body: { userId: string }) {
    return this.aiPlannerService.generateStudyPlanByUserId(body.userId);
  }
}
