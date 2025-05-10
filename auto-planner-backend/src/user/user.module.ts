import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service'; // 경로 주의
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService], // ✅ 반드시 여기에 등록!
  exports: [UserService],
})
export class UserModule {}
