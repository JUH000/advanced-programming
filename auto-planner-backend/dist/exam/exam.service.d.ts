import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
export declare class ExamService {
    private prisma;
    constructor(prisma: PrismaService);
    create(exam: CreateExamDto): Promise<{
        message: string;
        data: {
            chapters: {
                id: number;
                createdAt: Date;
                chapterTitle: string;
                difficulty: number;
                contentVolume: number;
                updatedAt: Date;
                examId: number;
            }[];
        } & {
            userId: number;
            id: number;
            createdAt: Date;
            subject: string;
            startDate: Date;
            endDate: Date;
            importance: number;
            updatedAt: Date;
        };
    }>;
    findByUser(userId: string): Promise<{
        userId: string;
        exams: ({
            chapters: {
                id: number;
                createdAt: Date;
                chapterTitle: string;
                difficulty: number;
                contentVolume: number;
                updatedAt: Date;
                examId: number;
            }[];
        } & {
            userId: number;
            id: number;
            createdAt: Date;
            subject: string;
            startDate: Date;
            endDate: Date;
            importance: number;
            updatedAt: Date;
        })[];
    }>;
    findLatestByUserId(userId: string): Promise<({
        chapters: {
            id: number;
            createdAt: Date;
            chapterTitle: string;
            difficulty: number;
            contentVolume: number;
            updatedAt: Date;
            examId: number;
        }[];
    } & {
        userId: number;
        id: number;
        createdAt: Date;
        subject: string;
        startDate: Date;
        endDate: Date;
        importance: number;
        updatedAt: Date;
    }) | null>;
}