import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceDto } from './dto/user-preference.dto';
export declare class UserPreferenceController {
    private readonly userPreferenceService;
    constructor(userPreferenceService: UserPreferenceService);
    savePreference(userId: string, dto: UserPreferenceDto): {
        message: string;
        userId: string;
        preference: UserPreferenceDto;
    };
    getPreference(userId: string): UserPreferenceDto | null;
}
