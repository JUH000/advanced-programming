import { AiPlannerService } from './ai-planner.service';
import { AiGeneratePlanDto } from './dto/ai-planner.dto';
import { SyncToNotionDto } from '../../notion/dto/sync-to-notion.dto';
export declare class AiPlannerController {
    private readonly aiPlannerService;
    constructor(aiPlannerService: AiPlannerService);
    generatePlan(body: AiGeneratePlanDto): Promise<SyncToNotionDto[]>;
}
