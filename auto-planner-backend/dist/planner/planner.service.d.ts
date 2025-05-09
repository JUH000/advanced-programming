import { GeneratePlanDto } from './dto/generate-plan.dto';
import { ConfirmPlanDto } from './dto/confirm-plan.dto';
import { NotionService } from 'src/notion/notion.service';
export declare class PlannerService {
    private readonly notionService;
    constructor(notionService: NotionService);
    generatePlan(dto: GeneratePlanDto): {
        message: string;
        promptSentToAPI: string;
        generatedPlan: string;
    };
    private _generatePrompt;
    confirmPlan(id: string, dto: ConfirmPlanDto): Promise<{
        message: string;
        daysAdded: number;
    }>;
}
