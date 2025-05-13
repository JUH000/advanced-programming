import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserPreferenceDto } from './dto/user-preference.dto';

@Injectable()
export class UserPreferenceService {
  constructor(private readonly prisma: PrismaService) {}

  async save(userId: string, dto: UserPreferenceDto) {
    // userId는 문자열인데 User 모델의 PK(id)는 숫자임. userId로 먼저 찾기
    const user = await this.prisma.user.findUnique({
      where: { userId }, // userId는 유니크한 필드임
    });

    if (!user) {
      throw new NotFoundException(`User ID ${userId} not found`);
    }

    const existing = await this.prisma.studyPreference.findUnique({
      where: { userId: user.id }, // 여긴 숫자 ID
    });

    const data = {
      style: dto.style,
      studyDays: dto.studyDays,
      sessionsPerDay: dto.sessionsPerDay,
      user: { connect: { id: user.id } },
    };

    if (existing) {
      return this.prisma.studyPreference.update({
        where: { userId: user.id },
        data,
      });
    } else {
      return this.prisma.studyPreference.create({ data });
    }
  }

  async findByUserId(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      include: { preference: true }, // 관계 조회
    });

    if (!user) {
      throw new NotFoundException(`User ID ${userId} not found`);
    }

    return user.preference;
  }
}
