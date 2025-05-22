import { Controller, Post, Body } from '@nestjs/common';
import { AiPlannerService } from './ai-planner.service';
import { AiGeneratePlanDto } from './dto/ai-planner.dto';
import { SyncToNotionDto } from '../../notion/dto/sync-to-notion.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('ai-plan')
@Controller('ai-plan')
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
  @ApiOkResponse({ type: [SyncToNotionDto] }) // ✅ 이거 추가
  async generatePlan(@Body() body: AiGeneratePlanDto) { // ✅ inline 타입 대신 DTO 사용
    return this.aiPlannerService.generateStudyPlanByUserId(body.userId);
  }
}
