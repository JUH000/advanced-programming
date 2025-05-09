import { Module } from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceController } from './user-preference.controller';

@Module({
  providers: [UserPreferenceService],
  controllers: [UserPreferenceController],
  exports: [UserPreferenceService], // ✅ 다른 모듈에서 사용 가능하도록 export
})
export class UserPreferenceModule {}