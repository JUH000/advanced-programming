import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Hugging Face API 호출을 위한 HttpModule
import { AiPlannerService } from './ai-planner.service';
import { AiPlannerController } from './ai-planner.controller';
import { UserPreferenceModule } from '../../user-preference/user-preference.module'; // ✅ 사용자 선호도 모듈 추가
import { ExamModule } from '../../exam/exam.module'; // ✅ 시험 정보 모듈 추가
import { NotionModule } from '../../notion/notion.module'; // ✅ Notion 연동 모듈 추가
import { LLMClientService } from './llm-client.service';

@Module({
  imports: [
    HttpModule, // HTTP 요청 기능을 위해 HttpModule 추가
    UserPreferenceModule, // ✅ 사용자 선호도 조회를 위해 필요
    ExamModule,            // ✅ 시험 정보 조회를 위해 필요
    NotionModule,          // ✅ Notion 연동을 위해 필요
  ],
  controllers: [AiPlannerController], // AI 요청을 처리하는 컨트롤러 등록
  providers: [AiPlannerService, LLMClientService], // 실제 처리 로직을 담당하는 서비스 등록
})
export class AiModule {}
// AiModule : ai 관련 기능만 담당하는 모듈로, HttpModule 포함
// Hugging Face API 호출을 위해 HttpModule을 import에 반드시 포함해야 함
