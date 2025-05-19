import { ApiProperty } from '@nestjs/swagger';

export class ConfirmPlanDto {
  @ApiProperty({ example: 'user123' })
  userId: string;

  @ApiProperty({ example: '고급 프로그래밍' })
  subject: string;

  @ApiProperty({ example: '2025-06-01' })
  startDate: string;

  @ApiProperty({ example: '2025-06-15' })
  endDate: string;

  @ApiProperty({ example: ['6/1: Chapter 1', '6/2: Chapter 2'] })
  dailyPlan: string[];

  @ApiProperty({ example: "1ea4fa76f8688090ae04fed52a6e3ca7" })
  databaseId: string;
}
