import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiGeneratePlanDto } from './dto/ai-planner.dto';
import axios from 'axios';
import { UserPreferenceService } from '../../user-preference/user-preference.service';
import { ExamService } from '../../exam/exam.service';

import { NotionService } from '../../notion/notion.service';

@Injectable()
export class AiPlannerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userPreferenceService: UserPreferenceService,
    private readonly examService: ExamService,
    private readonly notionService: NotionService, // ✅ 추가
  ) {}

  async generateStudyPlanByUserId(userId: string): Promise<any> {
    const preference = await this.userPreferenceService.findByUserId(userId);
    const exam = await this.examService.findLatestByUserId(userId); // 가장 최근 시험 가져오기 (예시)

    if (!preference || !exam) throw new InternalServerErrorException('필수 정보가 없습니다');

    const prompt = this.createPrompt(exam, preference); // ✅ 여기서부터 dto → exam

    const hfApiKey = this.configService.get<string>('HF_API_KEY');
    const hfModel = this.configService.get<string>('HF_MODEL');

    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${hfModel}`,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${hfApiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const rawText = response.data?.[0]?.generated_text || response.data;
      const parsed = JSON.parse(rawText);
      const optimized = this.optimizeResponse(parsed, exam.startDate);// ← dto → exam
      await this.notionService.saveScheduleToNotion(userId, optimized);
      return optimized;
    } catch (err) {
      console.error('[AI 오류]', err);
      throw new InternalServerErrorException('AI 처리 실패');
    }
  }

  private createPrompt(dto: any, pref: any): string {
    const chapters = dto.chapters
      .map(
        (ch, i) =>
          `Chapter ${i + 1}: "${ch.chapterTitle}", 난이도: ${ch.difficulty}, 분량: ${ch.contentVolume}`,
      )
      .join('\n');

    return [
      '당신은 학습 계획을 세우는 인공지능입니다.',
      '아래 정보를 기반으로 하루 단위 학습 일정을 JSON 형식으로 만들어 주세요.',
      '',
      `[사용자 정보]`,
      `- 학습 스타일: ${pref.style === 'focus' ? '하루 한 과목 집중' : '여러 과목 병행'}`,
      `- 학습 요일: ${pref.studyDays.join(', ')}`,
      `- 하루 학습 세션 수: ${pref.sessionsPerDay}`,
      `- 기상 유형: ${pref.wakeTime === 'morning' ? '오전형(9시 시작)' : '야행성(18시 시작)'}`,
      '',
      '[시험 정보]',
      `- 과목: ${dto.subject}`,
      `- 학습 기간: ${dto.startDate} ~ ${dto.endDate}`,
      `- 중요도: ${dto.importance}/5`,
      '- 챕터 목록:',
      chapters,
      '',
      '규칙:',
      '1. 모든 챕터를 남은 일수에 균등하게 분배하세요.',
      '2. 하루 단위로 "day"를 지정하고, 해당 날짜의 "chapters"를 배열로 제공하세요.',
      '3. 복습 또는 휴식일도 포함되면 좋습니다.',
      '4. 설명 없이 JSON 배열만 출력해 주세요. 백틱(```)은 쓰지 마세요.',
      '',
      '예시 출력:',
      '[',
      '  { "day": 1, "chapters": ["Chapter 1", "Chapter 2"] },',
      '  { "day": 2, "chapters": ["Chapter 3"] }',
      ']',
    ].join('\n');
  }
// ✅ 프론트에 넘기기 좋게 날짜/키 포맷 최적화
  private optimizeResponse(parsed: any[], startDate: string): any[] {
    const { format, addDays } = require('date-fns');

    return parsed.map((item, index) => {
      const currentDate = addDays(new Date(startDate), index);
      return {
        date: format(currentDate, 'yyyy-MM-dd'),
        day: item.day || index + 1,
        tasks: item.chapters || [],
      };
    });
  }
}
