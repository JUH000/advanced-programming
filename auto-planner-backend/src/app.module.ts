import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { UserPreferenceModule } from './user-preference/user-preference.module';
import { AuthModule } from './auth/auth.module';
import { ExamModule } from './exam/exam.module';
import { AiModule } from './planner/ai/ai.module';
import { PlannerModule } from './planner/planner.module';
import { NotionModule } from './notion/notion.module'; // ✅ 다시 주석 해제하여 활성화

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    UserModule,
    AuthModule,
    UserPreferenceModule,
    ExamModule,
    AiModule,
    PlannerModule,
    NotionModule, // ✅ 반드시 포함되어야 라우터 활성화됨
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
