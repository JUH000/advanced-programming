import { PlannerService } from './planner.service';
import { ConfirmPlanDto } from './dto/confirm-plan.dto';
export declare class PlannerController {
    private readonly plannerService;
    constructor(plannerService: PlannerService);
    confirmPlan(id: string, dto: ConfirmPlanDto): Promise<{
        message: string;
        daysAdded: number;
    }>;
}
