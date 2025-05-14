import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceDto } from './dto/user-preference.dto';
export declare class UserPreferenceController {
    private readonly userPreferenceService;
    constructor(userPreferenceService: UserPreferenceService);
    savePreference(userId: string, dto: UserPreferenceDto): Promise<any>;
    getPreference(userId: string): Promise<never>;
}
