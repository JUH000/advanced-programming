import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserPreferenceService } from '../../user-preference/user-preference.service';
import { ExamService } from '../../exam/exam.service';
import { LLMClientService } from './llm-client.service';
import { SyncToNotionDto } from '../../notion/dto/sync-to-notion.dto';

@Injectable()
export class AiPlannerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userPreferenceService: UserPreferenceService,
    private readonly examService: ExamService,
    private readonly llmClient: LLMClientService,
  ) {}

  async generateStudyPlanByUserId(userId: string): Promise<SyncToNotionDto[]> {
    const preference = await this.userPreferenceService.findByUserId(userId);
    const { exams } = await this.examService.findByUser(userId);
    console.log('✅ preference:', preference);
    console.log('✅ exams:', exams);

    if (!preference || !exams || exams.length === 0) {
      throw new InternalServerErrorException('❌ 유저 정보 또는 시험 데이터가 부족합니다.');
    }

    const mergedSubjects = this.mergeSubjects(exams);
    const prompt = this.createPrompt(mergedSubjects, preference);
    const raw = await this.llmClient.generate(prompt);

    const jsonMatch = raw.match(/\[\s*{[\s\S]*?}\s*\]/);
    if (!jsonMatch) {
      console.error('❌ LLM 응답에서 JSON 추출 실패:', raw);
      throw new InternalServerErrorException('LLM 응답이 JSON 배열 형식이 아닙니다.');
    }

    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed;
    } catch (e) {
      console.error('❌ JSON 파싱 오류:', jsonMatch[0]);
      throw new InternalServerErrorException('JSON 파싱에 실패했습니다.');
    }
  }

  private mergeSubjects(exams: any[]): any[] {
    const grouped: Record<string, any> = {};

    for (const exam of exams) {
      const key = exam.subject;
      if (!grouped[key]) {
        grouped[key] = {
          subject: exam.subject,
          startDate: exam.startDate,
          endDate: exam.endDate,
          chapters: [...exam.chapters],
        };
      } else {
        grouped[key].startDate = new Date(exam.startDate) < new Date(grouped[key].startDate)
          ? exam.startDate
          : grouped[key].startDate;
        grouped[key].endDate = new Date(exam.endDate) > new Date(grouped[key].endDate)
          ? exam.endDate
          : grouped[key].endDate;
        grouped[key].chapters.push(...exam.chapters);
      }
    }

    return Object.values(grouped);
  }

  private createPrompt(subjects: any[], pref: any): string {
    const lines = [
      'You are an AI that returns ONLY a JSON array in the following format:',
      '[{"subject": "과목명", "startDate": "yyyy-MM-dd", "endDate": "yyyy-MM-dd", "dailyPlan": ["6/1: 과목명 - 챕터명"]}]',
      '',
      'DO NOT add any explanation, headers, or notes.',
      '',
      `User Preferences:`,
      `- Style: ${pref.style === 'focus' ? 'Focused' : 'Multi'}`,
      `- Study Days: ${pref.studyDays.join(', ')}`,
      `- Sessions per Day: ${pref.sessionsPerDay}`,
      '',
      'Exams:',
    ];

    for (const subj of subjects) {
      const chapters = subj.chapters
        .map((ch, i) => `Chapter ${i + 1}: ${ch.chapterTitle}`)
        .join(', ');
      lines.push(
        `- Subject: ${subj.subject}`,
        `  Period: ${new Date(subj.startDate).toDateString()} ~ ${new Date(subj.endDate).toDateString()}`,
        `  Chapters: ${chapters}`,
        ''
      );
    }

    lines.push('Only return the JSON array.');
    return lines.join('\n');
  }
}
