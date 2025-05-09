import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';

@Injectable()
export class ExamService {
  private exams: CreateExamDto[] = [];

  create(exam: CreateExamDto) {
    this.exams.push(exam);
    return {
      message: '시험 정보 등록 완료',
      data: exam,
    };
  }

  findByUser(userId: string) {
    const results = this.exams.filter(exam => exam.userId === userId);
    return {
      userId,
      exams: results,
    };
  }

  // ✅ 가장 최근 등록된 시험 1건만 가져오기
  findLatestByUserId(userId: string) {
    const userExams = this.exams.filter(exam => exam.userId === userId);
    const latest = userExams[userExams.length - 1];
    return latest || null;
  }
}
