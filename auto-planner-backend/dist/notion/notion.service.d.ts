import { ConfigService } from '@nestjs/config';
import { SyncToNotionDto } from './dto/sync-to-notion.dto';
export declare class NotionService {
    private configService;
    private notion;
    private databaseId;
    constructor(configService: ConfigService);
    addPlanEntry(data: {
        userId: string;
        subject: string;
        date: string;
        content: string;
    }): Promise<import("@notionhq/client/build/src/api-endpoints").CreatePageResponse>;
    syncToNotion(dto: SyncToNotionDto): Promise<{
        message: string;
        count: number;
    }>;
    saveScheduleToNotion(userId: string, schedule: any[]): Promise<{
        message: string;
    }>;
}
