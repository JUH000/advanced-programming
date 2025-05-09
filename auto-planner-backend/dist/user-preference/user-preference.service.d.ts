import { UserPreferenceDto } from './dto/user-preference.dto';
export declare class UserPreferenceService {
    private store;
    save(userId: string, dto: UserPreferenceDto): {
        message: string;
        userId: string;
        preference: UserPreferenceDto;
    };
    findByUserId(userId: string): UserPreferenceDto | null;
}
