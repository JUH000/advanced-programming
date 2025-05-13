import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceDto } from './dto/user-preference.dto';
export declare class UserPreferenceController {
    private readonly userPreferenceService;
    constructor(userPreferenceService: UserPreferenceService);
    savePreference(userId: string, dto: UserPreferenceDto): Promise<{
        userId: number;
        id: number;
        style: string;
        studyDays: string[];
        sessionsPerDay: number;
    }>;
    getPreference(userId: string): Promise<{
        userId: number;
        id: number;
        style: string;
        studyDays: string[];
        sessionsPerDay: number;
    } | null>;
}
