import { CreateExamDto } from './dto/create-exam.dto';
export declare class ExamService {
    private exams;
    create(exam: CreateExamDto): {
        message: string;
        data: CreateExamDto;
    };
    findByUser(userId: string): {
        userId: string;
        exams: CreateExamDto[];
    };
    findLatestByUserId(userId: string): CreateExamDto;
}
