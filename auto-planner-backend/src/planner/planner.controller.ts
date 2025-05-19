// planner.controller.ts
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PlannerService } from './planner.service';
import { ConfirmPlanDto } from './dto/confirm-plan.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { getToken } from 'src/auth/notion-token.store';

@ApiTags('planner')
@Controller('planner')
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Post(':id/confirm')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'id', description: '확정할 계획 ID' })
  @ApiOperation({ summary: '공부 계획 확정 및 Notion 연동 (mock)' })
  confirmPlan(
    @Param('id') id: string,
    @Body() dto: ConfirmPlanDto,
  ) {
    const token = getToken(dto.userId); // ✅ Notion token 불러오기
    // console.log(`[PLANNER] 불러온 Notion token: ${token}`);
    console.log(`[DEBUG] Notion token for user ${dto.userId}:`, token);


    return this.plannerService.confirmPlan(id, dto);
  }
}


