import { Injectable } from '@nestjs/common';
import { UserPreferenceDto } from './dto/user-preference.dto';

@Injectable()
export class UserPreferenceService {
  private store = new Map<string, UserPreferenceDto>(); // 임시 저장소

  save(userId: string, dto: UserPreferenceDto) {
    this.store.set(userId, dto);
    return { message: '저장 완료', userId, preference: dto };
  }

  findByUserId(userId: string) {
    const data = this.store.get(userId);
    return data ? data : null;
  }
}