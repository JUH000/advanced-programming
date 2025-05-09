import { SyncToNotionDto } from './dto/sync-to-notion.dto';
import { NotionService } from './notion.service';
export declare class NotionController {
    private readonly notionService;
    constructor(notionService: NotionService);
    sync(dto: SyncToNotionDto): Promise<{
        message: string;
        count: number;
    }>;
}
