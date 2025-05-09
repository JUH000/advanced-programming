import { CreateExamDto } from './dto/create-exam.dto';
import { ExamService } from './exam.service';
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    create(createExamDto: CreateExamDto): {
        message: string;
        data: CreateExamDto;
    };
    findByUser(userId: string): {
        userId: string;
        exams: CreateExamDto[];
    };
}
