import { AiPlannerService } from './ai-planner.service';
export declare class AiPlannerController {
    private readonly aiPlannerService;
    constructor(aiPlannerService: AiPlannerService);
    generatePlan(body: {
        userId: string;
    }): Promise<any>;
}
