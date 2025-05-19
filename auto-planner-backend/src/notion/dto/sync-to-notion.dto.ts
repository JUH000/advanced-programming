import { ApiProperty } from '@nestjs/swagger';

export class SyncToNotionDto {
  @ApiProperty({ example: 'user123' })
  userId: string;

  @ApiProperty({ example: '수학' })
  subject: string;

  @ApiProperty({ example: '2025-06-01' })
  startDate: string;

  @ApiProperty({ example: '2025-06-15' })
  endDate: string;

  @ApiProperty({ example: ['6/1: 수열의 개념', '6/2: 등차수열'] })
  dailyPlan: string[];

  databaseId: string;
}
