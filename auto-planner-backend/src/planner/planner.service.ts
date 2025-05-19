// planner.service.ts
import { Injectable } from '@nestjs/common';
import { GeneratePlanDto } from './dto/generate-plan.dto';
import { ConfirmPlanDto } from './dto/confirm-plan.dto';
import { NotionService } from 'src/notion/notion.service';

@Injectable()
export class PlannerService {
  constructor(
    private readonly notionService: NotionService 
  ) {}

  generatePlan(dto: GeneratePlanDto) {
    const prompt = this._generatePrompt(dto);

    return {
      message: '계획 생성 성공',
      promptSentToAPI: prompt,
      generatedPlan: `시험 과목: ${dto.subject}, 기간: ${dto.startDate} ~ ${dto.endDate}, 챕터 수: ${dto.chapters.length}`,
    };
  }

  private _generatePrompt(dto: GeneratePlanDto): string {
    return `
      사용자는 ${dto.studyPreference} 성향입니다.
      과목: ${dto.subject}
      시험 기간: ${dto.startDate} ~ ${dto.endDate}
      중요도: ${dto.importance}
      학습 챕터 수: ${dto.chapters.length}
    `;
  }

  async confirmPlan(id: string, dto: ConfirmPlanDto) {
    for (const entry of dto.dailyPlan) {
      const [date, content] = entry.split(':').map(v => v.trim());
  
      const [month, day] = date.split('/');
      const paddedMonth = month.padStart(2, '0');
      const paddedDay = day.padStart(2, '0');
      const formattedDate = `2025-${paddedMonth}-${paddedDay}`;
  
      await this.notionService.addPlanEntry({
        userId: dto.userId,
        subject: dto.subject,
        date: formattedDate, 
        content: content,
        databaseId: dto.databaseId,
      });
    }
  
    return {
      message: '공부 계획이 Notion에 연동되었습니다.',
      daysAdded: dto.dailyPlan.length,
    };
  }
  
  // confirmPlan(planId: string, dto: ConfirmPlanDto) {
  //   console.log('planId:', planId);         // 디버깅
  //   console.log('dto:', dto);               // 디버깅
  
  //   return {
  //     message: '공부 계획이 확정되었습니다.',
  //     syncedPlanId: planId,
  //     data: dto,
  //   };
  // }
  
  // confirmPlan(planId: string, dto: ConfirmPlanDto) {
  //   // 실제 Notion API 호출은 아직 구현하지 않음
  //   console.log(`[Mock Notion 연동] planId: ${planId}`);
  //   console.log(dto);

  //   return {
  //     message: '공부 계획이 확정되었습니다. Notion 전송 준비 완료',
  //     syncedPlanId: planId,
  //     dataForNotion: dto,
  //   };
  // }
}

