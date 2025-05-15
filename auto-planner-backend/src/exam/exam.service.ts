// exam.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // 경로는 프로젝트 구조에 따라 조정
import { CreateExamDto } from './dto/create-exam.dto';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

// exam.service.ts
  async create(exam: CreateExamDto) {
    // 1. 문자열 userId로 내부 user.id 찾기
    const user = await this.prisma.user.findUnique({
      where: { userId: exam.userId },
    });

    if (!user) {
      throw new Error(`User with userId '${exam.userId}' not found`);
    }

    // 2. exam 저장 (user.id로 연결)
    const created = await this.prisma.exam.create({
      data: {
        subject: exam.subject,
        startDate: new Date(exam.startDate),
        endDate: new Date(exam.endDate),
        importance: exam.importance,
        userId: user.id,
        chapters: {
          create: exam.chapters.map((ch) => ({
            chapterTitle: ch.chapterTitle,
            difficulty: ch.difficulty,
            contentVolume: ch.contentVolume,
          })),
        },
      },
      include: { chapters: true },
    });

    return {
      message: '시험 정보 등록 완료',
      data: created,
    };
  }
  // exam.service.ts
async findByUser(userId: string) {
  const user = await this.prisma.user.findUnique({ where: { userId } });
  if (!user) return { userId, exams: [] };

  const exams = await this.prisma.exam.findMany({
    where: { userId: user.id },
    include: { chapters: true },
  });

  return { userId, exams };
}

async findLatestByUserId(userId: string) {
  const user = await this.prisma.user.findUnique({ where: { userId } });
  if (!user) return null;

  return await this.prisma.exam.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: { chapters: true },
  });
}

}