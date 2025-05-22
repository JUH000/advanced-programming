import { ConfigService } from '@nestjs/config';
import { UserPreferenceService } from '../../user-preference/user-preference.service';
import { ExamService } from '../../exam/exam.service';
import { LLMClientService } from './llm-client.service';
import { SyncToNotionDto } from '../../notion/dto/sync-to-notion.dto';
export declare class AiPlannerService {
    private readonly configService;
    private readonly userPreferenceService;
    private readonly examService;
    private readonly llmClient;
    constructor(configService: ConfigService, userPreferenceService: UserPreferenceService, examService: ExamService, llmClient: LLMClientService);
    generateStudyPlanByUserId(userId: string): Promise<SyncToNotionDto[]>;
    private mergeSubjects;
    private createPrompt;
}
