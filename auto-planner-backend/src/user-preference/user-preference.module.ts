import { Module } from '@nestjs/common';
import { UserPreferenceService } from './user-preference.service';
import { UserPreferenceController } from './user-preference.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UserPreferenceService, PrismaService],
  controllers: [UserPreferenceController],
  exports: [UserPreferenceService],
})
export class UserPreferenceModule {}
