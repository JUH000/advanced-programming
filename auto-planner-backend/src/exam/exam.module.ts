// src/exam/exam.module.ts

import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ExamService, PrismaService],
  controllers: [ExamController],
  exports: [ExamService], // ✅ 이 줄을 꼭 추가!
})
export class ExamModule {}
