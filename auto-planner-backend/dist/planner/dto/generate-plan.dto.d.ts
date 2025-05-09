import { ChapterInfoDto } from '../../exam/dto/chapter-info.dto';
export declare class GeneratePlanDto {
    userId: string;
    subject: string;
    startDate: string;
    endDate: string;
    importance: number;
    chapters: ChapterInfoDto[];
    studyPreference: string;
}
