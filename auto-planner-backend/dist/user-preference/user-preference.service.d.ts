import { PrismaService } from '../prisma/prisma.service';
import { UserPreferenceDto } from './dto/user-preference.dto';
export declare class UserPreferenceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(userId: string, dto: UserPreferenceDto): Promise<{
        userId: number;
        id: number;
        style: string;
        studyDays: string[];
        sessionsPerDay: number;
    }>;
    findByUserId(userId: string): Promise<{
        userId: number;
        id: number;
        style: string;
        studyDays: string[];
        sessionsPerDay: number;
    } | null>;
}
