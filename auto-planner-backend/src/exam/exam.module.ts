import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';

@Module({
  providers: [ExamService],
  exports: [ExamService], // ✅ 추가: 다른 모듈에서 사용할 수 있도록 내보냄
  controllers: [ExamController],
})
export class ExamModule {}
