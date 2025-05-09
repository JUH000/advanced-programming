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
// import { NotionModule } from './notion/notion.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ .env 전역 사용 가능하게 설정
    }),
    HttpModule, // ✅ axios 기반 HTTP 모듈
    UserModule,
    AuthModule,
    UserPreferenceModule,
    ExamModule,
    AiModule,
    PlannerModule,
    // NotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
