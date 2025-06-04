import { PrismaService } from '../../prisma/prisma.service';
import { LlmClientService } from './server/llm-client.service';
export declare class AiPlannerService {
    private readonly prisma;
    private readonly llmClient;
    constructor(prisma: PrismaService, llmClient: LlmClientService);
    private extractAllJsonBlocks;
    generateStudyPlanAndSave(userId: string, databaseId?: string): Promise<any[]>;
    private cleanupExistingPlans;
    getStudyPlansByUserId(userId: string): Promise<({
        dailyPlans: {
            id: number;
            content: string;
            date: Date;
            studyPlanId: number;
        }[];
    } & {
        userId: number;
        id: number;
        subject: string;
        startDate: Date;
        endDate: Date;
        databaseId: string;
    })[]>;
    private saveStudyPlans;
    private createPromptFromUserData;
}
